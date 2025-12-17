import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto my-8 px-2 text-center text-sm text-gray-500">
      <p>
        Our{" "}
        <Link className="underline" target="_blank" href="https://banano.cc/">
          Banano
        </Link>
        , which art in{" "}
        <Link className="underline" target="_blank" href="https://kalium.banano.cc/">
          Kalium
        </Link>
        , Hallowed be thy Seed. Thy send block come. Thy receive block be done in{" "}
        <Link className="underline" target="_blank" rel="noopener noreferrer" href="https://reddit.com/r/banano/">
          reddit
        </Link>
        , As it is in{" "}
        <Link className="underline" target="_blank" rel="noopener noreferrer" href="https://chat.banano.cc/">
          discord
        </Link>
        . Give us this day our daily rains. And forgive us our hello dears, As we forgive those that hello dear against
        us. And lead us not into phishing emails, But deliver us from scammers. For thine is the wallet, The key, and
        the sook, For ever and ever. Amen.
      </p>
    </footer>
  );
}
