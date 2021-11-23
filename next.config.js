/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['monkey.banano.cc'],
    },
    eslint: {
        dirs: ['pages', 'components', 'helper', 'tests'],
    },
};
