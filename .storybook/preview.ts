import type { Preview } from '@storybook/react'
import { createElement } from 'react'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        layout: 'fullscreen',
        docs: {
            story: {
                inline: true,
                iframeHeight: 400
            }
        }
    },
    decorators: [
        (Story) => createElement('div', {
            style: {
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative'
            }
        }, createElement(Story))
    ]
}

export default preview
