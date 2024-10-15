import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs';
import Link from 'next/link';
import SelectVersion from './components/select-version/SelectVersion';

const config: DocsThemeConfig = {
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>();
    const description = config.frontMatter.description || 'Website description';
    const title = `${config.title} | Atopus`;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        {/* Favicons, meta */}
        {/* Get favicon here from png */}
        {/* https://favicon.io/favicon-converter/#google_vignette */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
        <link rel="manifest" href="/logo/site.webmanifest" />
      </>
    );
  },
  notFound: {
    content: () => {
      return (
        <h1>Not found</h1>
      )
    },
    labels: "Not found 404"
  },
  toc: {
    float: true
  },
  logoLink: false,
  logo: function useRouterLogo() {
    const [selectedVersion, setSelectedVersion] = useState('latest');
    const [renderSelect, setRenderSelect] = useState(true);

    const versionsArr = ['latest']; // Danh sách các phiên bản có sẵn

    useEffect(() => {
      const pathArray = window.location.pathname.split('/');
      setRenderSelect(pathArray.includes('docs') && pathArray[1] === 'docs');
      const currentVersion = pathArray[pathArray.length - 1];

      if (currentVersion === 'latest') {
        const latestVersion = versionsArr.sort((a, b) => (a > b ? -1 : 1))[0];
        setSelectedVersion(latestVersion);
      } else if (versionsArr.includes(currentVersion)) {
        setSelectedVersion(currentVersion);
      }
    }, [versionsArr]);

    const handleChange = (e) => {
      let version = e.target.value;
      const latestVersion = versionsArr.sort((a, b) => (a > b ? -1 : 1))[0];
      if (version === latestVersion) {
        version = 'latest';
      }
      setSelectedVersion(version);
      if (version) {
        window.location.href = `/docs/${version}`;
      }
    };

    return (
      <div className='flex flex-row'>
        <a
          href="/"
          className="hidden sm:flex items-center text-current no-underline hover:opacity-75 ltr:mr-auto rtl:ml-auto"
        >
          <img src="/logo/logo.png" alt="logo" width={45} height={45} />
          <span className="select-none font-bold ltr:ml-2 rtl:mr-2 inline">Aptimus</span>
        </a>

        {
          renderSelect &&
          <select
            value={selectedVersion}
            onChange={handleChange}
            className="bg-gray-100 sm:ms-[80px] py-2 px-4 pe-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          >
            {versionsArr.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        }
      </div>
    );
  },
  darkMode: true,
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1
  },
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',

  footer: {
    component: (
      <footer className="bg-white dark:bg-neutral-900">
        <hr className="dark:nx-border-neutral-800" />
        <div className="mx-auto max-w-[1440px] p-6 lg:py-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()} Aptimus.{' '}
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              
            </div>
          </div>
        </div>
      </footer>
    ),
  },
}

export default config
