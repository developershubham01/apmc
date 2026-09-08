import { db } from "@/lib/db";

/**
 * In-app notification feed ("mail outbox" pattern).
 *
 * The sandbox has no SMTP/Resend credentials, so instead of silently losing
 * enquiry/subscriber alerts they are persisted here. The admin control
 * centre renders them in a bell dropdown, giving the same operational value
 * as an email alert until a real mail provider is wired in.
 *
 * Like telemetry, a notification failure must never break the user-facing
 * request, so everything is wrapped in try/catch.
 */
const MAX_NOTIFICATIONS = 200;

export async function pushNotification(input: {
  type: "enquiry" | "subscriber" | "system";
  title: string;
  body: string;
  refId?: string;
}): Promise<void> {
  try {
    await db.notification.create({
      data: {
        type: input.type,
        title: input.title,
        body: input.body,
        refId: input.refId ?? null,
      },
    });

    // Keep the feed tidy: prune everything beyond the newest MAX_NOTIFICATIONS.
    const keep = await db.notification.findMany({
      orderBy: { createdAt: "desc" },
      skip: MAX_NOTIFICATIONS,
      take: 1,
      select: { createdAt: true },
    });
    if (keep.length > 0) {
      await db.notification.deleteMany({
        where: { createdAt: { lt: keep[0].createdAt } },
      });
    }
  } catch (err) {
    console.error("[notify] Failed to record notification:", err);
  }
}
