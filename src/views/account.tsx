import { UpdateProfile } from "~/components/account/update-profile";
import { ExportBookmarks } from "~/components/bookmarks/export-bookmarks";

export function AccountView() {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="font-bold text-3xl">Account settings</h1>
      <UpdateProfile />
      <ExportBookmarks />
    </div>
  );
}
