import Link from "next/link";
import { Dot } from "../../src/components/atoms/Dot";
import { XText, XHeading, XButton } from "../../src/components/atoms";
import "../simple-page.css";

export default function HowToPlayPage() {
  return (
    <div className="simple-page">
      <XHeading level={1} size="lg" align="center">
        How to Play
      </XHeading>

      <div className="how-to-play-section">
        <XText>
          Find the four groups of four items that share a hidden connection.
        </XText>
        <XText>
          Select four items and tap <strong>Submit</strong> to check your guess.
        </XText>
        <XText>
          You can make <strong>4 mistakes</strong> before the game ends.
        </XText>
        <XText>
          A new puzzle is available every day for each genre.
        </XText>
      </div>

      <div className="how-to-play-colors">
        <Dot size="sm" variant="color" color="yellow" /> Easy
        <Dot size="sm" variant="color" color="green" /> Medium
        <Dot size="sm" variant="color" color="blue" /> Hard
        <Dot size="sm" variant="color" color="purple" /> Expert
      </div>

      <Link href="/">
        <XButton variant="primary" size="md">
          Play Now
        </XButton>
      </Link>
    </div>
  );
}
