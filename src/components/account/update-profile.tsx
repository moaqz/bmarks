import { toast } from "sonner";

import { useForm } from "~/hooks/useForm";
import { SERVICES } from "~/lib/appwrite";
import { useAuth } from "~/hooks/useAuth";

export function UpdateProfile() {
  const { revalidateSession, user } = useAuth();
  const { data, handleChange, handleSubmit, isSubmitting } = useForm({
    name: user?.name ?? "",
  });

  const hasChanged = user?.name === data.name;

  return (
    <form onSubmit={(event) => {
      event.preventDefault();

      handleSubmit(async ({ name }) => {
        await SERVICES.account.updateName(name)
          .then(() => {
            toast.success("Name has been updated");
            revalidateSession();
          })
          .catch(e => toast.error(e.message));
      });
    }}
    >
      <article className="card">
        <h2 className="text-2xl font-medium">
          Profile
        </h2>

        <div className="form-item">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            disabled
            className="input-text disabled:opacity-50"
            value={user?.email}
          />
        </div>

        <div className="form-item">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            required
            min={3}
            max={50}
            className="input-text"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit" className="button" disabled={hasChanged}>
            {isSubmitting
              ? (
                  <>
                    <svg width="24" height="24" className="animate-spin">
                      <use href="/icons/ui.svg#loader-circle" />
                    </svg>
                    <span>Updating...</span>
                  </>
                )
              : "Update"}
          </button>
        </div>
      </article>
    </form>
  );
}
