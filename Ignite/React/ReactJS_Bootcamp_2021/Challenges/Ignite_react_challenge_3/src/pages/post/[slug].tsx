import Head from 'next/head';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';
import Header from '../../components/Header';

interface Post {
  uid?: string;
  last_publication_date?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  nextPost: { uid: string; title: string };
  prevPost: { uid: string; title: string };
  preview: boolean;
  previewData?: {
    ref: string | number | string[];
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Post({
  post,
  nextPost,
  prevPost,
  preview,
  previewData,
}: PostProps) {
  const { isFallback } = useRouter();
  const words = post?.data.content
    .reduce((acc, value) => {
      const { heading } = value;
      const body = RichText.asText(value.body);

      return acc.concat(heading, body);
    }, '')
    .split(' ');

  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('repo', 'LucasDibz/ignite-desafio04-blog');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'photon-dark');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    anchor.appendChild(script);
  }, []);

  const readingTime = Math.ceil(words?.length / 200);
  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>

      <Header />

      {isFallback ? (
        <div>
          <h1>Carregando...</h1>
        </div>
      ) : (
        <>
          <div className={styles.banner}>
            <img src={post?.data.banner.url} alt="banner" />
          </div>
          <main className={styles.container}>
            <article className={styles.content}>
              <h1>{post?.data.title}</h1>
              <div>
                <div>
                  <FiCalendar />
                  <time>
                    {format(
                      new Date(post.first_publication_date),
                      'dd MMM yyyy',
                      {
                        locale: ptBR,
                      }
                    )}
                  </time>

                  <FiUser />
                  <span>{post?.data.author}</span>
                  <FiClock />
                  <span>{readingTime} min</span>
                </div>
                {post.last_publication_date > post.first_publication_date && (
                  <div className={styles.editedPost}>
                    <span>* editado em</span>
                    <time>
                      {format(
                        new Date(post.first_publication_date),
                        "dd MMM yyyy, 'às' hh:mm",
                        {
                          locale: ptBR,
                        }
                      )}
                    </time>
                  </div>
                )}
              </div>

              {post?.data.content.map(content => (
                <div key={content.heading.length}>
                  <strong>{content.heading}</strong>
                  {content.body.map(body => (
                    <p key={body.text.length}>{body.text}</p>
                  ))}
                </div>
              ))}
            </article>
          </main>

          <footer className={styles.footer}>
            <hr />

            <div>
              {prevPost.uid ? (
                <button type="button" style={{ textAlign: 'left' }}>
                  <a href={prevPost.uid}>
                    {prevPost.title} <br />
                    <span>Post Anterior</span>
                  </a>
                </button>
              ) : (
                <div />
              )}

              {nextPost.uid ? (
                <button type="button" style={{ textAlign: 'right' }}>
                  <a href={nextPost.uid}>
                    {nextPost.title} <br />
                    <span>Próximo Post</span>
                  </a>
                </button>
              ) : (
                <div />
              )}
            </div>

            <div id="inject-comments-for-uterances" />

            {preview && (
              <aside>
                <Link href="/api/exit-preview">
                  <a>Sair do modo Preview</a>
                </Link>
              </aside>
            )}
          </footer>
        </>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );

  const params = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return { paths: params, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData = null,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  });

  // Post not found
  if (!response || !response?.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let nextPost = {};
  let prevPost = {};

  if (!preview) {
    const nextPostResponse = await prismic.query(
      Prismic.Predicates.dateAfter(
        'document.first_publication_date',
        response.first_publication_date
      )
    );
    nextPost = {
      uid: nextPostResponse?.results[0]?.uid ?? '',
      title: nextPostResponse?.results[0]?.data.title ?? '',
    };

    const prevPostResponse = await prismic.query(
      Prismic.Predicates.dateBefore(
        'document.first_publication_date',
        response.first_publication_date
      )
    );
    prevPost = {
      uid: prevPostResponse?.results[0]?.uid ?? '',
      title: prevPostResponse?.results[0]?.data.title ?? '',
    };
  }

  const post: Post = {
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: response?.data,
    uid: response.uid,
  };

  return {
    props: {
      post,
      nextPost,
      prevPost,
      preview,
    },
  };
};
