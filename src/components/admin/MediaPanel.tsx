"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Newspaper,
  CalendarRange,
  HeartHandshake,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  RefreshCw,
  UploadCloud,
  Eye,
  EyeOff,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ListPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MediaCategorySlug = "news" | "events" | "social-activities";

type MediaItemData = {
  id: string;
  slug: string;
  category: MediaCategorySlug;
  title: string;
  date: string;
  location?: string | null;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  content?: string | null;
  sourceUrl?: string | null;
  isPublished: boolean;
  sortOrder?: number;
  createdAt?: string;
};

type Props = {
  adminKey: string;
  onAuthError: () => void;
};

const CATEGORY_MAP: Record<MediaCategorySlug, { label: string; Icon: typeof Newspaper; color: string }> = {
  news: { label: "News & Broadcasts", Icon: Newspaper, color: "bg-blue-50 text-blue-700 border-blue-200" },
  events: { label: "Events & Summits", Icon: CalendarRange, color: "bg-amber-50 text-amber-700 border-amber-200" },
  "social-activities": { label: "Social & Welfare", Icon: HeartHandshake, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export function MediaPanel({ adminKey, onAuthError }: Props) {
  const [items, setItems] = useState<MediaItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Create / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<MediaCategorySlug>("news");
  const [dateStr, setDateStr] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [summary, setSummary] = useState("");
  const [highlights, setHighlights] = useState<string[]>([""]);
  const [content, setContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Upload helpers
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      if (!res.ok) throw new Error("Failed to load media");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 60);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(generateSlug(val));
    }
    if (!imageAlt) {
      setImageAlt(val);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCategory("news");
    setDateStr(new Date().getFullYear().toString() + " Updates");
    setLocation("Navi Mumbai APMC, Maharashtra");
    setImage("");
    setImageAlt("");
    setSummary("");
    setHighlights([""]);
    setContent("");
    setSourceUrl("");
    setIsPublished(true);
    setFileToUpload(null);
    setPreviewUrl(null);
    setUploadMode("file");
    setFormError(null);
    setFormSuccess(null);
    setShowModal(true);
  };

  const openEditModal = (item: MediaItemData) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setCategory(item.category);
    setDateStr(item.date);
    setLocation(item.location || "");
    setImage(item.image);
    setImageAlt(item.imageAlt);
    setSummary(item.summary);
    setHighlights(item.highlights && item.highlights.length > 0 ? item.highlights : [""]);
    setContent(item.content || "");
    setSourceUrl(item.sourceUrl || "");
    setIsPublished(item.isPublished);
    setFileToUpload(null);
    setPreviewUrl(item.image);
    setUploadMode("url");
    setFormError(null);
    setFormSuccess(null);
    setShowModal(true);
  };

  const addHighlight = () => setHighlights([...highlights, ""]);
  const removeHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };
  const updateHighlight = (idx: number, val: string) => {
    const updated = [...highlights];
    updated[idx] = val;
    setHighlights(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    try {
      let finalImageUrl = image.trim();

      // 1. Upload file if file mode
      if (uploadMode === "file" && fileToUpload) {
        const formData = new FormData();
        formData.append("file", fileToUpload);

        const upRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-admin-key": adminKey },
          body: formData,
        });

        if (upRes.status === 401) {
          onAuthError();
          return;
        }
        if (!upRes.ok) {
          const errData = await upRes.json();
          throw new Error(errData.error || "Failed to upload image file.");
        }

        const upData = await upRes.json();
        finalImageUrl = upData.url;
      }

      if (!finalImageUrl) {
        throw new Error("Cover image is required. Please upload or specify image path.");
      }

      const filteredHighlights = highlights.map((h) => h.trim()).filter(Boolean);

      const payload = {
        slug: slug.trim() || generateSlug(title),
        category,
        title: title.trim(),
        date: dateStr.trim(),
        location: location.trim() || undefined,
        image: finalImageUrl,
        imageAlt: imageAlt.trim() || title.trim(),
        summary: summary.trim(),
        highlights: filteredHighlights,
        content: content.trim() || undefined,
        sourceUrl: sourceUrl.trim() || undefined,
        isPublished,
      };

      let res: Response;
      if (editingId) {
        res = await fetch("/api/media", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        res = await fetch("/api/media", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save article.");
      }

      setFormSuccess(editingId ? "Article updated successfully!" : "Article published successfully!");
      await fetchMedia();
      setTimeout(() => {
        setShowModal(false);
      }, 900);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) throw new Error("Delete failed");

      setDeleteConfirmId(null);
      await fetchMedia();
    } catch (err) {
      console.error(err);
      alert("Failed to delete article.");
    }
  };

  const togglePublished = async (item: MediaItemData) => {
    try {
      const res = await fetch("/api/media", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: item.id,
          isPublished: !item.isPublished,
        }),
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) throw new Error("Status update failed");

      await fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-800 text-navy">
            News, Events & Media Desk
          </h2>
          <p className="text-sm text-ink-600">
            Publish television broadcasts, press releases, chamber summits, and welfare programmes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchMedia()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-600 text-ink-600 shadow-sm transition hover:bg-mist"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-xs font-700 text-navy shadow-gold-glow transition hover:bg-gold-400 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            New Article / Event
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("ALL")}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-700 uppercase tracking-wider transition-all",
              activeCategory === "ALL"
                ? "bg-navy text-white shadow-sm"
                : "bg-mist text-ink-600 hover:bg-royal-50 hover:text-royal"
            )}
          >
            All Items ({items.length})
          </button>
          {(["news", "events", "social-activities"] as MediaCategorySlug[]).map((catKey) => {
            const count = items.filter((i) => i.category === catKey).length;
            const config = CATEGORY_MAP[catKey];
            const Icon = config.Icon;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setActiveCategory(catKey)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-700 uppercase tracking-wider transition-all",
                  activeCategory === catKey
                    ? "bg-navy text-white shadow-sm"
                    : "bg-mist text-ink-600 hover:bg-royal-50 hover:text-royal"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/50" />
          <input
            type="text"
            placeholder="Search news & events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-mist/50 pl-9 pr-4 py-2 text-xs text-ink placeholder:text-ink-600/40 focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Articles List / Cards */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-white">
          <div className="flex flex-col items-center gap-2 text-ink-600">
            <Loader2 className="h-6 w-6 animate-spin text-royal" />
            <span className="text-xs font-600">Loading media records...</span>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center">
          <Newspaper className="h-12 w-12 text-ink-600/30" />
          <h3 className="mt-4 font-heading text-lg font-700 text-navy">No articles found</h3>
          <p className="mt-1 max-w-sm text-xs text-ink-600">
            {searchQuery
              ? "No articles match your search."
              : "No publications in this category. Click 'New Article' to publish one."}
          </p>
          <button
            type="button"
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-600 text-white hover:bg-navy-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Create First Article
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const catInfo = CATEGORY_MAP[item.category] || CATEGORY_MAP.news;
            const Icon = catInfo.Icon;

            return (
              <div
                key={item.id}
                className={cn(
                  "group flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-premium-lg",
                  item.isPublished ? "border-border" : "border-amber-300 bg-amber-50/10"
                )}
              >
                <div>
                  {/* Image Box */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-700 uppercase tracking-wider backdrop-blur-md shadow-sm", catInfo.color)}>
                        <Icon className="h-3 w-3" />
                        {catInfo.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePublished(item)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-700 uppercase tracking-wider backdrop-blur-md transition",
                          item.isPublished
                            ? "bg-emerald-500/90 text-white shadow-sm"
                            : "bg-amber-500/90 text-white shadow-sm"
                        )}
                        title="Toggle visibility"
                      >
                        {item.isPublished ? (
                          <>
                            <Eye className="h-2.5 w-2.5" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-2.5 w-2.5" /> Draft
                          </>
                        )}
                      </button>
                    </div>

                    {/* Date / Location on Photo */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[0.7rem] font-600 text-white/90">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gold" />
                        {item.date}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1 truncate max-w-[140px]">
                          <MapPin className="h-3 w-3 text-gold" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-base font-700 leading-snug text-navy line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-600 line-clamp-3">
                      {item.summary}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-3 space-y-1 border-t border-border/60 pt-2.5">
                        <p className="text-[0.68rem] font-700 uppercase tracking-wider text-royal">
                          Key Highlights ({item.highlights.length}):
                        </p>
                        <ul className="space-y-1">
                          {item.highlights.slice(0, 2).map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[0.72rem] text-ink-600">
                              <span className="mt-1 h-1 w-1 rounded-full bg-gold shrink-0" />
                              <span className="line-clamp-1">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between border-t border-border bg-mist/40 px-5 py-3">
                  <span className="font-mono text-[0.65rem] text-ink-600/60 truncate max-w-[120px]">
                    /{item.category}/{item.slug}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-600 text-ink-600 shadow-sm transition hover:border-gold hover:bg-gold-50 hover:text-navy"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </button>

                    {deleteConfirmId === item.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-red-600 px-2 py-1 text-xs font-700 text-white hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-lg bg-mist px-1.5 py-1 text-xs font-600 text-ink-600 hover:bg-border"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-white text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                        title="Delete article"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-3xl border border-gold/30 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold-600 ring-1 ring-gold/40">
                  <Newspaper className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-800 text-navy">
                    {editingId ? "Edit Article / Event" : "Publish New Article / Event"}
                  </h3>
                  <p className="text-xs text-ink-600">
                    Broadcast news, summits, and community initiatives
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full p-1.5 text-ink-600/70 hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Category & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Desk Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MediaCategorySlug)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-600 text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="news">News & Live Broadcasts</option>
                    <option value="events">Events & Programmes</option>
                    <option value="social-activities">Social Welfare & Initiatives</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 rounded-xl border border-border bg-mist/50 p-2.5 cursor-pointer hover:bg-mist">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="h-4 w-4 rounded text-gold focus:ring-gold"
                    />
                    <span className="text-xs font-600 text-navy">
                      Publish immediately on live portal
                    </span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Bharatiya Vyapar Mahotsav 2026 — Bharat Mandapam"
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* URL Slug */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  URL Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. bharatiya-vyapar-mahotsav-2026"
                  className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs font-mono text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Date / Period *
                  </label>
                  <input
                    type="text"
                    required
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    placeholder="e.g. 12–15 August 2026 or 2026 Live"
                    className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bharat Mandapam, New Delhi"
                    className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div className="space-y-3 rounded-2xl border border-border bg-mist/30 p-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-700 text-royal uppercase tracking-wide">
                    Cover Image *
                  </label>
                  <div className="flex rounded-lg bg-mist p-0.5 text-[0.7rem] font-600">
                    <button
                      type="button"
                      onClick={() => setUploadMode("file")}
                      className={cn(
                        "rounded px-2.5 py-1",
                        uploadMode === "file" ? "bg-white text-navy shadow-sm font-700" : "text-ink-600"
                      )}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode("url")}
                      className={cn(
                        "rounded px-2.5 py-1",
                        uploadMode === "url" ? "bg-white text-navy shadow-sm font-700" : "text-ink-600"
                      )}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {uploadMode === "file" ? (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="media-cover-file"
                    />
                    <label
                      htmlFor="media-cover-file"
                      className="flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gold/50 bg-white p-3 text-center transition hover:border-gold"
                    >
                      {previewUrl ? (
                        <div className="relative h-24 w-40 overflow-hidden rounded-lg border border-gold">
                          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="h-6 w-6 text-gold-600" />
                          <span className="mt-1 text-xs font-600 text-navy">
                            Choose cover photograph
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="/images/media/my-news.jpg"
                    className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                )}

                <div>
                  <label className="mb-1 block text-[0.7rem] font-600 text-ink-600">
                    Image Alt Description
                  </label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Short description for accessibility"
                    className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs text-ink focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Summary / Excerpt *
                </label>
                <textarea
                  rows={3}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Overview of the news coverage, delegation meet or programme..."
                  className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Key Highlights Bullet Points */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-600 text-royal">
                    Key Highlights & Takeaways (Bullet Points)
                  </label>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="inline-flex items-center gap-1 text-[0.7rem] font-700 text-royal hover:text-navy"
                  >
                    <ListPlus className="h-3.5 w-3.5" />
                    Add Bullet Point
                  </button>
                </div>
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold shrink-0">{i + 1}.</span>
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => updateHighlight(i, e.target.value)}
                      placeholder="e.g. Broadcast live on TV1 India News Channel"
                      className="w-full rounded-xl border border-border bg-white px-3 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        className="p-1 text-ink-600/50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* External Link */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  External Media / Video Link (Optional)
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?... or https://news-outlet.com/..."
                  className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Alerts */}
              {formError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-500 text-red-700 ring-1 ring-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-500 text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-600 text-ink-600 hover:bg-mist"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-2.5 text-xs font-700 text-white shadow-premium transition hover:bg-navy-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {editingId ? "Save Changes" : "Publish Article"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
