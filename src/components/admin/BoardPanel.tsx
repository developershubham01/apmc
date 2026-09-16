"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Users,
  UploadCloud,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  RefreshCw,
  Camera,
  AlertCircle,
  CheckCircle2,
  Crown,
  Briefcase,
  Layers,
  Sparkles,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getInitials,
  type BoardMember,
  type BoardCategory,
  determineBoardCategory,
} from "@/data/boardMembers";
import { MonogramAvatar } from "@/components/site/MonogramAvatar";

type Props = {
  adminKey: string;
  onAuthError: () => void;
};

export function BoardPanel({ adminKey, onAuthError }: Props) {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Quick Photo Upload Modal State
  const [quickUploadMember, setQuickUploadMember] = useState<BoardMember | null>(null);
  const [quickUploadMode, setQuickUploadMode] = useState<"file" | "url">("file");
  const [quickFile, setQuickFile] = useState<File | null>(null);
  const [quickPreview, setQuickPreview] = useState<string | null>(null);
  const [quickUrlInput, setQuickUrlInput] = useState("");
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);
  const [quickSuccess, setQuickSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Add / Edit Member Modal State
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [designationInput, setDesignationInput] = useState("");
  const [categoryInput, setCategoryInput] = useState<BoardCategory>("director");
  const [imageInput, setImageInput] = useState("");
  const [sortOrderInput, setSortOrderInput] = useState(0);
  const [memberFileToUpload, setMemberFileToUpload] = useState<File | null>(null);
  const [memberPreviewUrl, setMemberPreviewUrl] = useState<string | null>(null);
  const [memberUploadMode, setMemberUploadMode] = useState<"file" | "url">("file");
  const [memberModalLoading, setMemberModalLoading] = useState(false);
  const [memberModalError, setMemberModalError] = useState<string | null>(null);
  const [memberModalSuccess, setMemberModalSuccess] = useState<string | null>(null);
  const memberFileInputRef = useRef<HTMLInputElement | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/board");
      if (!res.ok) throw new Error("Failed to load board members");
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Open Quick Photo Upload Modal for a specific member
  const handleOpenQuickUpload = (member: BoardMember) => {
    setQuickUploadMember(member);
    setQuickFile(null);
    setQuickPreview(member.image || null);
    setQuickUrlInput(member.image || "");
    setQuickUploadMode(member.image ? "url" : "file");
    setQuickError(null);
    setQuickSuccess(null);
  };

  const handleQuickFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQuickFile(file);
      setQuickPreview(URL.createObjectURL(file));
      setQuickError(null);
    }
  };

  const handleSaveQuickPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUploadMember || !quickUploadMember.id) return;
    setQuickLoading(true);
    setQuickError(null);
    setQuickSuccess(null);

    try {
      let finalImageUrl = quickUrlInput.trim();

      if (quickUploadMode === "file" && quickFile) {
        const formData = new FormData();
        formData.append("file", quickFile);

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
          throw new Error(errData.error || "Failed to upload photo file.");
        }

        const upData = await upRes.json();
        finalImageUrl = upData.url;
      }

      // Update Member
      const updateRes = await fetch("/api/board", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: quickUploadMember.id,
          image: finalImageUrl || null,
        }),
      });

      if (updateRes.status === 401) {
        onAuthError();
        return;
      }

      if (!updateRes.ok) {
        const errData = await updateRes.json();
        throw new Error(errData.error || "Failed to update member photo.");
      }

      setQuickSuccess("Board member photo saved successfully!");
      await fetchMembers();
      setTimeout(() => {
        setQuickUploadMember(null);
      }, 800);
    } catch (err: unknown) {
      setQuickError(err instanceof Error ? err.message : "Failed to upload photo");
    } finally {
      setQuickLoading(false);
    }
  };

  const handleRemovePhoto = async (member: BoardMember) => {
    if (!member.id) return;
    if (!confirm(`Remove photo for ${member.name}? This will restore their monogram avatar.`)) {
      return;
    }

    try {
      const res = await fetch("/api/board", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: member.id,
          image: null,
        }),
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }

      if (!res.ok) throw new Error("Failed to remove photo");

      await fetchMembers();
    } catch (err) {
      console.error(err);
      alert("Failed to remove photo.");
    }
  };

  // Open Full Add / Edit Modal
  const handleOpenAddMember = () => {
    setEditingMember(null);
    setNameInput("");
    setDesignationInput("Director");
    setCategoryInput("director");
    setImageInput("");
    setSortOrderInput(members.length);
    setMemberFileToUpload(null);
    setMemberPreviewUrl(null);
    setMemberUploadMode("file");
    setMemberModalError(null);
    setMemberModalSuccess(null);
    setShowMemberModal(true);
  };

  const handleOpenEditMember = (member: BoardMember) => {
    setEditingMember(member);
    setNameInput(member.name);
    setDesignationInput(member.designation);
    setCategoryInput(member.category || determineBoardCategory(member.designation));
    setImageInput(member.image || "");
    setSortOrderInput(member.sortOrder ?? 0);
    setMemberFileToUpload(null);
    setMemberPreviewUrl(member.image || null);
    setMemberUploadMode(member.image ? "url" : "file");
    setMemberModalError(null);
    setMemberModalSuccess(null);
    setShowMemberModal(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setMemberModalLoading(true);
    setMemberModalError(null);
    setMemberModalSuccess(null);

    try {
      let finalImageUrl = imageInput.trim();

      if (memberUploadMode === "file" && memberFileToUpload) {
        const formData = new FormData();
        formData.append("file", memberFileToUpload);

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

      if (editingMember && editingMember.id) {
        // PUT
        const res = await fetch("/api/board", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({
            id: editingMember.id,
            name: nameInput.trim(),
            designation: designationInput.trim(),
            category: categoryInput,
            image: finalImageUrl || null,
            sortOrder: Number(sortOrderInput),
          }),
        });

        if (res.status === 401) {
          onAuthError();
          return;
        }
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to update member.");
        }

        setMemberModalSuccess("Board member updated successfully!");
      } else {
        // POST
        const res = await fetch("/api/board", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({
            name: nameInput.trim(),
            designation: designationInput.trim(),
            category: categoryInput,
            image: finalImageUrl || null,
            sortOrder: Number(sortOrderInput),
          }),
        });

        if (res.status === 401) {
          onAuthError();
          return;
        }
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to create member.");
        }

        setMemberModalSuccess("Board member added successfully!");
      }

      await fetchMembers();
      setTimeout(() => {
        setShowMemberModal(false);
      }, 800);
    } catch (err: unknown) {
      setMemberModalError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setMemberModalLoading(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const res = await fetch(`/api/board?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) throw new Error("Delete failed");

      setDeleteConfirmId(null);
      await fetchMembers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete member.");
    }
  };

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const cat = m.category || determineBoardCategory(m.designation);
    const matchesFilter =
      activeFilter === "ALL" ||
      (activeFilter === "CHAIRMAN" && cat === "chairman") ||
      (activeFilter === "OFFICE" && cat === "office-bearer") ||
      (activeFilter === "DIRECTOR" && cat === "director") ||
      (activeFilter === "WITH_PHOTO" && Boolean(m.image)) ||
      (activeFilter === "NO_PHOTO" && !m.image);

    const matchesSearch =
      !searchQuery.trim() ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const photoCount = members.filter((m) => Boolean(m.image)).length;

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="font-heading text-xl sm:text-2xl font-800 text-navy">
              Board of Directors & Leadership Photos
            </h2>
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-700 text-gold-600 ring-1 ring-gold/30">
              {members.length} Members
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-ink-600">
            Upload and manage official high-resolution photographs for Chamber Chairman, Office Bearers & Directors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchMembers}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-600 text-ink shadow-sm transition hover:bg-mist"
            title="Refresh list"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin text-royal")} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddMember}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs font-700 text-white shadow-premium transition hover:bg-navy-700"
          >
            <Plus className="h-4 w-4 text-gold" />
            <span>Add Board Member</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-600 text-ink-600">Total Board</span>
            <Users className="h-4 w-4 text-royal" />
          </div>
          <div className="mt-2 text-2xl font-800 text-navy">{members.length}</div>
          <p className="text-[0.7rem] text-ink-600">Active board positions</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-600 text-emerald-800">Photos Uploaded</span>
            <Camera className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-800 text-emerald-900">{photoCount}</div>
          <p className="text-[0.7rem] text-emerald-700">
            {Math.round((photoCount / (members.length || 1)) * 100)}% coverage
          </p>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gold-50/30 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-600 text-gold-800">Pending Photos</span>
            <Sparkles className="h-4 w-4 text-gold-600" />
          </div>
          <div className="mt-2 text-2xl font-800 text-gold-900">
            {members.length - photoCount}
          </div>
          <p className="text-[0.7rem] text-gold-700">Using monogram avatars</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-600 text-ink-600">Office Bearers</span>
            <Crown className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-800 text-navy">
            {members.filter((m) => (m.category || determineBoardCategory(m.designation)) === "office-bearer" || (m.category || determineBoardCategory(m.designation)) === "chairman").length}
          </div>
          <p className="text-[0.7rem] text-ink-600">Chairman, Sec, Treas.</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: "All Members" },
            { id: "CHAIRMAN", label: "Chairman" },
            { id: "OFFICE", label: "Office Bearers" },
            { id: "DIRECTOR", label: "Directors" },
            { id: "WITH_PHOTO", label: "📸 With Photo" },
            { id: "NO_PHOTO", label: "Pending Photo" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-600 transition",
                activeFilter === tab.id
                  ? "bg-navy text-white shadow-sm font-700"
                  : "bg-mist text-ink-600 hover:bg-royal-50 hover:text-royal"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-600/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member name or post..."
            className="w-full rounded-xl border border-border bg-white pl-9 pr-4 py-1.5 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Grid of Board Members with Direct Photo Upload Triggers */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-royal" />
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-white p-12 text-center">
          <Users className="mx-auto h-10 w-10 text-ink-600/50" />
          <h3 className="mt-3 font-heading text-base font-700 text-navy">
            No board members found
          </h3>
          <p className="mt-1 text-xs text-ink-600">
            {searchQuery
              ? `No members match "${searchQuery}" in this category.`
              : "No members available under this filter."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member) => {
            const cat = member.category || determineBoardCategory(member.designation);
            const isChair = cat === "chairman";
            const isOffice = cat === "office-bearer";
            const initials = getInitials(member.name);

            return (
              <div
                key={member.id || member.name}
                className={cn(
                  "group relative flex flex-col items-center justify-between rounded-2xl border bg-white p-5 text-center shadow-sm transition hover:shadow-premium",
                  isChair
                    ? "border-gold/60 ring-1 ring-gold/20"
                    : isOffice
                    ? "border-royal/30"
                    : "border-border"
                )}
              >
                {/* Category Badge */}
                <div className="w-full flex items-center justify-between">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[0.65rem] font-700 uppercase tracking-wider",
                      isChair
                        ? "bg-gold text-navy font-800"
                        : isOffice
                        ? "bg-royal-50 text-royal ring-1 ring-royal/20"
                        : "bg-mist text-ink-600"
                    )}
                  >
                    {member.designation}
                  </span>

                  {member.image ? (
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-600 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Photo Ready
                    </span>
                  ) : (
                    <span className="text-[0.65rem] font-500 text-ink-600 bg-mist px-2 py-0.5 rounded-full">
                      Monogram
                    </span>
                  )}
                </div>

                {/* Avatar with Camera Overlay Trigger */}
                <div className="relative mt-4 group/avatar">
                  {member.image ? (
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-2 ring-gold/40 shadow-sm">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <MonogramAvatar
                      initials={initials}
                      name={member.name}
                      designation={member.designation}
                      size="lg"
                    />
                  )}

                  {/* Camera Upload Button Overlay */}
                  <button
                    type="button"
                    onClick={() => handleOpenQuickUpload(member)}
                    className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-gold shadow-md ring-2 ring-white transition hover:bg-gold hover:text-navy"
                    title="Upload or change member photo"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Name & Post */}
                <div className="mt-4 w-full">
                  <h3 className="font-heading text-sm font-700 text-navy line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-ink-600 mt-0.5">{member.designation}</p>
                </div>

                {/* Action Controls */}
                <div className="mt-4 flex w-full items-center justify-between border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => handleOpenQuickUpload(member)}
                    className="inline-flex items-center gap-1.5 text-xs font-600 text-royal hover:text-navy transition"
                  >
                    <UploadCloud className="h-3.5 w-3.5" />
                    <span>{member.image ? "Change Photo" : "Upload Photo"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {member.image && (
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(member)}
                        className="rounded-lg p-1.5 text-ink-600/70 hover:bg-red-50 hover:text-red-600 transition"
                        title="Remove photo (revert to monogram)"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleOpenEditMember(member)}
                      className="rounded-lg p-1.5 text-ink-600/70 hover:bg-mist hover:text-ink transition"
                      title="Edit member details"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    {member.id && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete board member ${member.name}?`)) {
                            handleDeleteMember(member.id!);
                          }
                        }}
                        className="rounded-lg p-1.5 text-ink-600/70 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete member from board"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK PHOTO UPLOAD MODAL */}
      {quickUploadMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-premium rounded-3xl border border-gold/40 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20 text-gold-600 ring-1 ring-gold/40">
                  <Camera className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-800 text-navy">
                    Upload Photo
                  </h3>
                  <p className="text-xs text-ink-600">
                    {quickUploadMember.name} • {quickUploadMember.designation}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickUploadMember(null)}
                className="rounded-full p-1.5 text-ink-600/70 hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickPhoto} className="mt-5 space-y-4">
              {/* Mode Toggle */}
              <div className="flex rounded-xl bg-mist p-1 text-xs font-600">
                <button
                  type="button"
                  onClick={() => setQuickUploadMode("file")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 transition",
                    quickUploadMode === "file"
                      ? "bg-white text-navy shadow-sm font-700"
                      : "text-ink-600 hover:text-ink"
                  )}
                >
                  📁 Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setQuickUploadMode("url")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 transition",
                    quickUploadMode === "url"
                      ? "bg-white text-navy shadow-sm font-700"
                      : "text-ink-600 hover:text-ink"
                  )}
                >
                  🔗 Direct Image URL / Path
                </button>
              </div>

              {/* Upload Dropzone or URL */}
              {quickUploadMode === "file" ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleQuickFileSelect}
                    className="hidden"
                    id="quick-board-photo"
                  />
                  <label
                    htmlFor="quick-board-photo"
                    className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold/50 bg-gold-50/20 p-4 text-center transition hover:border-gold hover:bg-gold-50/40"
                  >
                    {quickPreview ? (
                      <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-gold shadow-md">
                        <Image
                          src={quickPreview}
                          alt="Preview"
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="h-8 w-8 text-gold-600" />
                        <span className="mt-2 text-xs font-700 text-navy">
                          Click to browse portrait photograph
                        </span>
                        <span className="mt-1 text-[0.7rem] text-ink-600">
                          Supports PNG, JPG, WEBP up to 15MB
                        </span>
                      </>
                    )}
                  </label>
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Image URL or Public Path
                  </label>
                  <input
                    type="text"
                    value={quickUrlInput}
                    onChange={(e) => {
                      setQuickUrlInput(e.target.value);
                      setQuickPreview(e.target.value);
                    }}
                    placeholder="/images/kirti-rana/portrait-lead.jpg or https://..."
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              )}

              {/* Alerts */}
              {quickError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 ring-1 ring-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{quickError}</span>
                </div>
              )}
              {quickSuccess && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{quickSuccess}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setQuickUploadMember(null)}
                  className="rounded-xl px-4 py-2 text-xs font-600 text-ink-600 hover:bg-mist"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quickLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2 text-xs font-700 text-white shadow-premium transition hover:bg-navy-700 disabled:opacity-50"
                >
                  {quickLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5 text-gold" />
                      Save Member Photo
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL ADD / EDIT BOARD MEMBER MODAL */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-premium rounded-3xl border border-gold/40 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/40">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-800 text-navy">
                    {editingMember ? "Edit Board Member" : "Add Board Member"}
                  </h3>
                  <p className="text-xs text-ink-600">
                    Navi Mumbai Merchants Chamber Board of Directors
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMemberModal(false)}
                className="rounded-full p-1.5 text-ink-600/70 hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Shri Kirti Rana"
                  className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={designationInput}
                    onChange={(e) => setDesignationInput(e.target.value)}
                    placeholder="e.g. Chairman / Hon. Secretary"
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Board Category *
                  </label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value as BoardCategory)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 text-xs font-600 text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="chairman">Chairman</option>
                    <option value="office-bearer">Office Bearer</option>
                    <option value="director">Director</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload for Member */}
              <div className="space-y-2">
                <label className="block text-xs font-600 text-royal">
                  Member Photograph (Optional)
                </label>

                <div className="flex rounded-xl bg-mist p-1 text-xs font-600">
                  <button
                    type="button"
                    onClick={() => setMemberUploadMode("file")}
                    className={cn(
                      "flex-1 rounded-lg py-1.5 transition",
                      memberUploadMode === "file"
                        ? "bg-white text-navy shadow-sm font-700"
                        : "text-ink-600 hover:text-ink"
                    )}
                  >
                    📁 Upload Image File
                  </button>
                  <button
                    type="button"
                    onClick={() => setMemberUploadMode("url")}
                    className={cn(
                      "flex-1 rounded-lg py-1.5 transition",
                      memberUploadMode === "url"
                        ? "bg-white text-navy shadow-sm font-700"
                        : "text-ink-600 hover:text-ink"
                    )}
                  >
                    🔗 Image URL / Path
                  </button>
                </div>

                {memberUploadMode === "file" ? (
                  <div>
                    <input
                      type="file"
                      ref={memberFileInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setMemberFileToUpload(file);
                          setMemberPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                      id="member-photo-file"
                    />
                    <label
                      htmlFor="member-photo-file"
                      className="flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold/50 bg-gold-50/20 p-3 text-center transition hover:border-gold"
                    >
                      {memberPreviewUrl ? (
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-gold shadow-sm">
                          <Image
                            src={memberPreviewUrl}
                            alt="Preview"
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      ) : (
                        <>
                          <Camera className="h-6 w-6 text-gold-600" />
                          <span className="mt-1 text-xs font-700 text-navy">
                            Choose portrait photo
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={imageInput}
                    onChange={(e) => {
                      setImageInput(e.target.value);
                      setMemberPreviewUrl(e.target.value);
                    }}
                    placeholder="/images/kirti-rana/portrait-lead.jpg or https://..."
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                )}
              </div>

              {/* Sort Order */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Display Order Position (0 = first)
                </label>
                <input
                  type="number"
                  value={sortOrderInput}
                  onChange={(e) => setSortOrderInput(Number(e.target.value))}
                  className="w-28 rounded-xl border border-border bg-white px-3 py-1.5 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Alerts */}
              {memberModalError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 ring-1 ring-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{memberModalError}</span>
                </div>
              )}
              {memberModalSuccess && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{memberModalSuccess}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-600 text-ink-600 hover:bg-mist"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={memberModalLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2 text-xs font-700 text-white shadow-premium transition hover:bg-navy-700 disabled:opacity-50"
                >
                  {memberModalLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5 text-gold" />
                      {editingMember ? "Update Member" : "Add to Board"}
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
