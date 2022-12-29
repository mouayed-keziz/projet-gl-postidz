import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    carousel: {
        [`& .${getRef('carouselControls')}`]: {
            opacity: 1,
        },
    },

    carouselControls: {
        ref: getRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        width: 4,
        height: 4,
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: 16,
        },
    },
}));


export default useStyles;