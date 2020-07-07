import Link from 'next/link';
import { FC } from 'react';

const IndexPage: FC = () => (
  <ul>
    <li>
      <Link href="/lenders/bank-of-azeroth">
        <a>Bank of Azeroth</a>
      </Link>
    </li>
    <li>
      <Link href="/lenders/naboo-bank">
        <a>Naboo Bank</a>
      </Link>
    </li>
    <li>
      <Link href="/lenders/middle-earth-bank">
        <a>Middle Earth Bank</a>
      </Link>
    </li>
  </ul>
);

export default IndexPage;
