"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  RefreshCw,
  Copy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryCategory =
  | "KIRTI RANA"
  | "BUSINESS"
  | "ORGANIZATIONS"
  | "EVENTS"
  | "APMC"
  | "BOARD"
  | "MEDIA";

const CATEGORIES: GalleryCategory[] = [
  "KIRTI RANA",
  "BUSINESS",
  "ORGANIZATIONS",
  "EVENTS",
  "APMC",
  "BOARD",
  "MEDIA",
];

type GalleryItemData = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string | null;
  span?: "normal" | "wide" | "tall";
  sortOrder?: number;
  createdAt?: string;
};

type Props = {
  adminKey: string;
  onAuthError: () => void;
};

export function GalleryPanel({ adminKey, onAuthError }: Props) {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State for Add / Upload
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [categoryInput, setCategoryInput] = useState<GalleryCategory>("KIRTI RANA");
  const [spanInput, setSpanInput] = useState<"normal" | "wide" | "tall">("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Edit State
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [editUploadMode, setEditUploadMode] = useState<"file" | "url">("url");
  const [editFileToUpload, setEditFileToUpload] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error("Failed to load gallery");
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
    fetchGallery();
  }, [fetchGallery]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (!titleInput) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTitleInput(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const resetForm = () => {
    setFileToUpload(null);
    setPreviewUrl(null);
    setUrlInput("");
    setTitleInput("");
    setCaptionInput("");
    setCategoryInput("KIRTI RANA");
    setSpanInput("normal");
    setFormError(null);
    setFormSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreateOrUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    try {
      let finalSrc = urlInput.trim();

      // 1. If file upload mode, upload file first
      if (uploadMode === "file") {
        if (!fileToUpload && !previewUrl) {
          throw new Error("Please choose an image file to upload.");
        }
        if (fileToUpload) {
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
          finalSrc = upData.url;
        }
      }

      if (!finalSrc) {
        throw new Error("Image path or URL is required.");
      }

      if (!titleInput.trim()) {
        throw new Error("Please provide a title or alt description.");
      }

      // 2. Save Gallery Item to Database
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          src: finalSrc,
          alt: titleInput.trim(),
          category: categoryInput,
          caption: captionInput.trim() || undefined,
          span: spanInput,
        }),
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save photo to gallery.");
      }

      setFormSuccess("Photo added to gallery successfully!");
      await fetchGallery();
      setTimeout(() => {
        setShowAddModal(false);
        resetForm();
      }, 900);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEdit = (item: GalleryItemData) => {
    setEditingItem(item);
    setEditPreviewUrl(item.src);
    setEditFileToUpload(null);
    setEditUploadMode("url");
    setFormError(null);
    setFormSuccess(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      let finalSrc = editingItem.src;

      if (editUploadMode === "file" && editFileToUpload) {
        const formData = new FormData();
        formData.append("file", editFileToUpload);

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
          throw new Error(errData.error || "Failed to upload replacement image file.");
        }

        const upData = await upRes.json();
        finalSrc = upData.url;
      }

      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: editingItem.id,
          src: finalSrc,
          alt: editingItem.alt,
          category: editingItem.category,
          caption: editingItem.caption || "",
          span: editingItem.span || "normal",
        }),
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update item.");
      }

      await fetchGallery();
      setEditingItem(null);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) throw new Error("Delete failed");

      setDeleteConfirmId(null);
      await fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Failed to delete photo.");
    }
  };

  const copyUrl = (id: string, url: string) => {
    const fullUrl = url.startsWith("http") ? url : window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeFilter === "ALL" || item.category === activeFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Actions & Stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-800 text-navy">
            Photo & Media Gallery
          </h2>
          <p className="text-sm text-ink-600">
            Upload, categorize, and manage high-resolution photos across all portal sections.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchGallery()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-600 text-ink-600 shadow-sm transition hover:bg-mist"
            title="Refresh gallery"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-xs font-700 text-navy shadow-gold-glow transition hover:bg-gold-400 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Upload Photo
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveFilter("ALL")}
            className={cn(
              "rounded-xl px-3.5 py-1.5 text-xs font-700 uppercase tracking-wider transition-all",
              activeFilter === "ALL"
                ? "bg-navy text-white shadow-sm"
                : "bg-mist text-ink-600 hover:bg-royal-50 hover:text-royal"
            )}
          >
            All ({items.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 text-xs font-700 uppercase tracking-wider transition-all",
                  activeFilter === cat
                    ? "bg-navy text-white shadow-sm"
                    : "bg-mist text-ink-600 hover:bg-royal-50 hover:text-royal"
                )}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/50" />
          <input
            type="text"
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-mist/50 pl-9 pr-4 py-2 text-xs text-ink placeholder:text-ink-600/40 focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-white">
          <div className="flex flex-col items-center gap-2 text-ink-600">
            <Loader2 className="h-6 w-6 animate-spin text-royal" />
            <span className="text-xs font-600">Loading gallery records...</span>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center">
          <ImageIcon className="h-12 w-12 text-ink-600/30" />
          <h3 className="mt-4 font-heading text-lg font-700 text-navy">No photos found</h3>
          <p className="mt-1 max-w-sm text-xs text-ink-600">
            {searchQuery
              ? "No photos match your current search query."
              : "No photos in this category yet. Click 'Upload Photo' to add one."}
          </p>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-600 text-white hover:bg-navy-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-premium-lg"
            >
              {/* Photo Image Box */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-navy-900">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* Top Category Badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-navy-950/80 px-2.5 py-0.5 text-[0.65rem] font-700 uppercase tracking-wider text-gold backdrop-blur-sm">
                    {item.category}
                  </span>
                  {item.span && item.span !== "normal" && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.6rem] font-600 uppercase text-white backdrop-blur-sm">
                      {item.span}
                    </span>
                  )}
                </div>

                {/* Copy URL Quick Action */}
                <button
                  type="button"
                  onClick={() => copyUrl(item.id, item.src)}
                  className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-navy-950/80 text-white backdrop-blur-sm transition hover:bg-gold hover:text-navy"
                  title="Copy direct image URL"
                >
                  {copiedId === item.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Photo Details */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h4 className="font-heading text-sm font-700 text-navy line-clamp-1">
                    {item.alt}
                  </h4>
                  <p className="mt-1 text-xs text-ink-600 line-clamp-2">
                    {item.caption || "No caption added."}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="font-mono text-[0.65rem] text-ink-600/60 truncate max-w-[120px]">
                    {item.src}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-mist text-ink-600 transition hover:border-gold hover:bg-gold-50 hover:text-navy"
                      title="Edit photo info"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {deleteConfirmId === item.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-red-600 px-2 py-1 text-[0.68rem] font-700 text-white hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-lg bg-mist px-1.5 py-1 text-[0.68rem] font-600 text-ink-600 hover:bg-border"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-mist text-red-600 transition hover:border-red-300 hover:bg-red-50"
                        title="Delete photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload / Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl border border-gold/30 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold-600 ring-1 ring-gold/40">
                  <UploadCloud className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-800 text-navy">
                    Upload New Photo
                  </h3>
                  <p className="text-xs text-ink-600">
                    Add new photograph to portal media archive
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-full p-1.5 text-ink-600/70 hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpload} className="mt-6 space-y-5">
              {/* Mode Toggle: File Upload vs URL */}
              <div className="flex rounded-xl bg-mist p-1 text-xs font-600">
                <button
                  type="button"
                  onClick={() => setUploadMode("file")}
                  className={cn(
                    "flex-1 rounded-lg py-2 transition",
                    uploadMode === "file" ? "bg-white text-navy shadow-sm font-700" : "text-ink-600 hover:text-ink"
                  )}
                >
                  📁 Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={cn(
                    "flex-1 rounded-lg py-2 transition",
                    uploadMode === "url" ? "bg-white text-navy shadow-sm font-700" : "text-ink-600 hover:text-ink"
                  )}
                >
                  🔗 Image URL / Path
                </button>
              </div>

              {/* Upload Dropzone or URL input */}
              {uploadMode === "file" ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="photo-file-input"
                  />
                  <label
                    htmlFor="photo-file-input"
                    className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold/50 bg-gold-50/20 p-4 text-center transition hover:border-gold hover:bg-gold-50/40"
                  >
                    {previewUrl ? (
                      <div className="relative h-28 w-44 overflow-hidden rounded-xl border border-gold shadow-sm">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="h-8 w-8 text-gold-600" />
                        <span className="mt-2 text-xs font-700 text-navy">
                          Click to browse or drop photo here
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
                    Direct Image URL or Path
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="/images/gallery/my-photo.jpg or https://..."
                    className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              )}

              {/* Title / Alt */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Photo Title / Alt Text *
                </label>
                <input
                  type="text"
                  required
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. Shri Kirti Rana addressing Merchant Convention"
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Category & Span Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Category *
                  </label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value as GalleryCategory)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-600 text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Grid Span Layout
                  </label>
                  <select
                    value={spanInput}
                    onChange={(e) => setSpanInput(e.target.value as "normal" | "wide" | "tall")}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-600 text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="normal">Normal (1x1)</option>
                    <option value="wide">Wide (2 columns)</option>
                    <option value="tall">Tall (2 rows)</option>
                  </select>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Caption / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="Provide context or event details..."
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

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                      Publish to Gallery
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-gold/30 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-heading text-lg font-800 text-navy">
                Edit Photo Details
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-full p-1.5 text-ink-600/70 hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Photo Title / Alt Text
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.alt}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, alt: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as GalleryCategory,
                      })
                    }
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 text-xs font-600 text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-600 text-royal">
                    Grid Span
                  </label>
                  <select
                    value={editingItem.span || "normal"}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        span: e.target.value as "normal" | "wide" | "tall",
                      })
                    }
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 text-xs font-600 text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="normal">Normal (1x1)</option>
                    <option value="wide">Wide (2 columns)</option>
                    <option value="tall">Tall (2 rows)</option>
                  </select>
                </div>
              </div>

              {/* Replace / Change Photo */}
              <div className="space-y-2">
                <label className="block text-xs font-600 text-royal">
                  Photo Image / File
                </label>
                <div className="flex rounded-xl bg-mist p-1 text-xs font-600">
                  <button
                    type="button"
                    onClick={() => setEditUploadMode("file")}
                    className={cn(
                      "flex-1 rounded-lg py-1.5 transition",
                      editUploadMode === "file"
                        ? "bg-white text-navy shadow-sm font-700"
                        : "text-ink-600 hover:text-ink"
                    )}
                  >
                    📁 Upload New File
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditUploadMode("url")}
                    className={cn(
                      "flex-1 rounded-lg py-1.5 transition",
                      editUploadMode === "url"
                        ? "bg-white text-navy shadow-sm font-700"
                        : "text-ink-600 hover:text-ink"
                    )}
                  >
                    🔗 Image URL / Path
                  </button>
                </div>

                {editUploadMode === "file" ? (
                  <div>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setEditFileToUpload(file);
                          setEditPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                      id="edit-photo-file-input"
                    />
                    <label
                      htmlFor="edit-photo-file-input"
                      className="flex min-h-[90px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold/50 bg-gold-50/20 p-3 text-center transition hover:border-gold"
                    >
                      {editPreviewUrl ? (
                        <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-gold shadow-sm">
                          <Image
                            src={editPreviewUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="h-6 w-6 text-gold-600" />
                          <span className="mt-1 text-xs font-700 text-navy">
                            Choose new image to replace
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={editingItem.src}
                    onChange={(e) => {
                      setEditingItem({ ...editingItem, src: e.target.value });
                      setEditPreviewUrl(e.target.value);
                    }}
                    placeholder="/images/gallery/my-photo.jpg or https://..."
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-600 text-royal">
                  Caption
                </label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, caption: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-white px-4 py-2 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="rounded-xl px-4 py-2 text-xs font-600 text-ink-600 hover:bg-mist"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2 text-xs font-700 text-white hover:bg-navy-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
