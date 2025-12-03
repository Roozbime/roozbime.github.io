const resolveConfig = require('tailwindcss/resolveConfig');
const colors = require('tailwindcss/colors');

module.exports = resolveConfig({
    content: {
        files: ["./**/*.{razor,html,cshtml}"]
    },
    theme: {
        colors: colors,
        extend: {

        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
});