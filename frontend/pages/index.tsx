import Head from 'next/head'
import Header from '../components/Header';
import { ICategoriesData, ICategory } from '../utils/types';
import { client } from "../graphql/apollo-client";
import { GET_CATEGORIES_QUERY } from '../graphql/queries/categories';

interface IProps {
  categories: ICategory[];
}

export default function Home({ categories }: IProps ) {
  return (
    <div className='bg-background h-screen'>
      <Head>
        <title>Dapp Fiverr Clone</title>
        <meta name="description" content="A Dapp Fiverr Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header categories={categories}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await client.query<ICategoriesData, {}>({
    query: GET_CATEGORIES_QUERY,
    variables: {}
  });
  const categories = response.data.categories;
  return {
    props: {
      categories
    }
  }
}