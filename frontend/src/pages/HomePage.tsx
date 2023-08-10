import background from "../images/co-background.jpg";
import Button from "../components/Button";
import Card from "../components/Card";

export function HomePage() {
  var lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi elit, iaculis ac bibendum et, placerat eu leo.";
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="order-1 flex flex-col justify-center gap-8 md:order-first">
          <div className="flex flex-col items-start justify-center gap-4">
            <h1 className="text-5xl font-semibold">About</h1>
            <p className="text-left text-xl text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              mi elit, iaculis ac bibendum et, placerat eu leo. Aliquam erat
              volutpat. In varius, libero et fermentum facilisis, nisi dui
              laoreet nisl, sed lacinia ipsum mi id ligula.
            </p>
          </div>
          <Button text="Download Now" size={"base"} />
        </div>
        <img
          src={background}
          alt=""
          className="h-96 w-full rounded-4xl object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className=" text-5xl font-semibold">Keep track of the game</h1>
          <h2 className=" text-2xl text-gray-700">
            Become a better player everyday.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card title="Patch notes" desc={lorem} icon="news"></Card>
          <Card title="Rankings" desc={lorem} icon="social_leaderboard"></Card>
          <Card title="Marketplace" desc={lorem} icon="storefront"></Card>
        </div>
      </div>
    </>
  );
}
