import useSWR from 'swr';
import { useRouter } from 'next/router';
import { ApplicationForm } from 'components/ApplicationForm';

const getLenderId = (id: string | string[]) => (Array.isArray(id) ? id[0] : id);

const fetchLender = (lenderUrl: string) => {
  return fetch(lenderUrl)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
};

export default function LenderPage() {
  const router = useRouter();
  const { id = '' } = router.query;
  const lenderId = getLenderId(id);

  const { data, error } = useSWR(`/api/lenders/${lenderId}`, fetchLender);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <ApplicationForm data={data} lenderId={lenderId} />;
}
