import { Link } from "react-router-dom";
import { FEATURES } from "~/constants/features";

export function HomeView() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-y-3">
        <span className="text-sm w-fit px-3 py-0.5 font-medium bg-blue-3 text-blue-11 rounded-xl">
          beta
        </span>
        <h1 className="text-3xl font-extrabold">bmarks</h1>
        <p className="text-gray-11">
          Simple bookmark manager to organize your favorites websites.
        </p>
        <div>
          <Link to="/bookmarks" className="button">
            Get started
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-y-6">
        <h2 className="font-medium text-2xl">Features</h2>

        {FEATURES.map((feature) => (
          <div key={feature.iconName} className="flex items-center gap-x-3">
            <div className="items-center justify-center inline-flex rounded-md bg-blue-9 text-white size-9">
              <svg width="20" height="20">
                <use href={`/icons/features.svg#${feature.iconName}`} />
              </svg>
            </div>
            <p className="text-gray-11 text-balance">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
