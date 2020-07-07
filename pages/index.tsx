import Link from 'next/link';
import { FC } from 'react';

const IndexPage: FC = () => (
  <div>
    <h1>Lenders</h1>

    <ul>
      <li>
        <Link href="/lenders/[id]" as="/lenders/bank-of-azeroth">
          <a>Bank of Azeroth</a>
        </Link>
      </li>
      <li>
        <Link href="/lenders/[id]" as="/lenders/naboo-bank">
          <a>Naboo Bank</a>
        </Link>
      </li>
      <li>
        <Link href="/lenders/[id]" as="/lenders/middle-earth-bank">
          <a>Middle Earth Bank</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      div {
        max-width: 300px;
        margin: 0 auto;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      a {
        display: block;
        padding: 30px;
        margin: 30px 0;
        border: 1px solid #000;
        text-decoration: none;
        color: #000;
        text-transform: uppercase;
      }
    `}</style>
  </div>
);

export default IndexPage;
