import { Header } from "../components/shared/Header";
import { Card } from "../components/Card";
import background from "../images/co-background.jpg";

export function HomePage() {
  var lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi elit, iaculis ac bibendum et, placerat eu leo.";
  return (
    <div className="flex flex-col items-start gap-24 p-16">
      <Header></Header>
      <div className="flex items-start gap-16 self-stretch">
        <div
          className="flex w-1/2 flex-col items-start gap-16 self-stretch"
          style={{ flex: "1 0 0" }}
        >
          <div className="flex flex-col items-start justify-center gap-4">
            <h1 className=" text-6xl font-semibold">About</h1>
            <p
              className=" self-stretch text-left text-4xl text-gray-700"
              style={{ lineHeight: "150%" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              mi elit, iaculis ac bibendum et, placerat eu leo. Aliquam erat
              volutpat. In varius, libero et fermentum facilisis, nisi dui
              laoreet nisl, sed lacinia ipsum mi id ligula.
            </p>
          </div>
          <button className="flex items-start rounded-4xl bg-orange-600 px-16 py-8 text-4xl font-semibold text-white">
            Download Now
          </button>
        </div>
        <div
          className=" image w-full rounded-4xl"
          style={{
            flex: "1 0 0",
            height: "36rem",
            background: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>
      </div>
      <div className="flex flex-col items-start gap-12 self-stretch">
        <div className="flex flex-col items-start justify-center gap-4">
          <h1 className=" text-6xl font-semibold">Keep track of the game</h1>
          <h2 className=" text-4xl font-semibold text-gray-700">
            Become a better player everyday.
          </h2>
        </div>
        <div className="flex items-start gap-16 self-stretch">
          <Card title="Patch notes" desc={lorem} icon="news"></Card>
          <Card title="Rankings" desc={lorem} icon="social_leaderboard"></Card>
          <Card title="Marketplace" desc={lorem} icon="storefront"></Card>
        </div>
      </div>
    </div>
  );
}
