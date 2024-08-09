import { FEATURES } from "~/constants/features";

export default function HomeView() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-y-1">
        <span className="w-fit px-3 py-0.5 text-sm font-medium bg-blue-3 text-blue-11 rounded-xl">
          beta
        </span>
        <h1 className="text-3xl font-extrabold">bmarks</h1>
        <p className="text-gray-11">
          Simple bookmark manager to organize your favorites websites
        </p>
      </section>

      <section className="flex flex-col gap-y-6">
        <h2 className="text-2xl font-medium">Features</h2>

        {FEATURES.map(feature => (
          <div key={feature.iconName} className="flex items-center gap-x-3">
            <div className="inline-flex items-center justify-center rounded-md bg-blue-9 text-white size-8 px-2">
              <svg width="20" height="20">
                <use href={`/icons/features.svg#${feature.iconName}`} />
              </svg>
            </div>
            <p className="text-balance text-gray-11">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
