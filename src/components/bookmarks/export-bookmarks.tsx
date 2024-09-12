import { useState } from "react";
import { toast } from "sonner";
import { listDocuments } from "~/lib/appwrite";

export function ExportBookmarks() {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);

    listDocuments("bookmarks")
      .then(({ documents, total }) => {
        if (total <= 0) {
          toast.info("You don't have any bookmarks to export.");
          return;
        }

        const bookmarks = documents.map((document) => {
          return {
            name: document.title,
            url: document.url,
            tag: document.tag_id ? document.tag_id.name : null,
            created_at: document.$createdAt,
          };
        });

        const blob = new Blob([JSON.stringify(bookmarks, null, 2)], {
          type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bmarks-bookmarks.json";
        a.click();

        URL.revokeObjectURL(url);
      })
      .catch(() => toast.error("Unable to export bookmarks, try again."))
      .finally(() => setIsExporting(false));
  };

  return (
    <article className="card">
      <div className="flex flex-col gap-y-1">
        <h2 className="text-2xl font-medium">Export Bookmarks</h2>
        <p className="text-gray-11 text-pretty">
          Instantly export your bookmarks as JSON.
        </p>
      </div>

      <div>
        <button
          type="button"
          className="button"
          onClick={handleDownload}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <svg width="24" height="24" className="animate-spin">
                <use href="/icons/ui.svg#loader-circle" />
              </svg>
              <span>Exporting...</span>
            </>
          ) : (
            "Export"
          )}
        </button>
      </div>
    </article>
  );
}
