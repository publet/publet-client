/*
 * Publet --- online publishing platform
 * Copyright (C) 2016, Publet Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

exports.theme = {
  quoteStyles: {
    default: {
      style: { },
      name: 'default'
    },
    card: {
      style: {
        borderColor: 'silver',
        borderRadius: '2px',
        padding: '.5em',
        borderWidth: '1px',
        background: 'whitesmoke',
        borderStyle: 'solid'
      },
      name: 'card'
    }
  },
  palette: [
    {
      hex: '#1d2b54',
      name: 'dark blue'
    },
    {
      hex: '#1c4382',
      name: 'blue'
    },
    {
      hex: '#d59439',
      name: 'yellow'
    },
    {
      hex: '#21635a',
      name: 'dark teal'
    },
    {
      hex: '#b43833',
      name: 'red'
    },
    {
      hex: '#9d3434',
      name: 'dark red'
    },
    {
      hex: '#FFFFFF',
      name: 'white'
    },
    {
      hex: '#919191',
      name: 'grey'
    },
    {
      hex: '#333333',
      name: 'dark grey'
    },
    {
      hex: '#000000',
      name: 'black'
    }
  ],
  name: 'Default',
  buttonStyles: {
    default: {
      style: {
        borderColor: 'dimgray',
        color: 'lightgrey',
        textTransform: 'capitalize',
        padding: '.85em 1.5em',
        fontWeight: 400,
        fontSize: '1rem',
        borderWidth: '1px',
        background: 'grey',
        borderStyle: 'solid',
        borderRadius: '2px'
      },
      name: 'default'
    },
    CTA: {
      style: {
        borderColor: 'silver',
        letterSpacing: '2px',
        color: 'dimgray',
        textTransform: 'uppercase',
        padding: '.75em 2em',
        fontWeight: '800',
        fontSize: '1.2rem',
        borderWidth: '1px',
        background: 'ghostwhite',
        borderStyle: 'solid',
        borderRadius: '2px'
      },
      name: 'CTA'
    },
    secondary: {
      style: {
        borderColor: 'gray',
        padding: '.85em 1.5em',
        borderWidth: '1px',
        background: 'darkgrey',
        borderStyle: 'solid',
        textTransform: 'capitalize'
      },
      name: 'secondary'
    }
  },
  textStyles: {
    title: {
      style: {
        color: 'white',
        fontFamily: ' "open sans", helvetica, sans-serif',
        fontSize: '36px',
        textTransform: 'none',
        fontWeight: '700'
      },
      name: 'title'
    },
    paragraph: {
      style: {
        fontFamily: ' "open sans", helvetica, sans-serif',
        color: 'black',
        fontWeight: '400',
        fontSize: '14px',
        letterSpacing: '0px',
        textTransform: 'none'
      },
      name: 'paragraph'
    },
    header2: {
      style: {
        color: '#1d2b54',
        fontFamily: ' "open sans", helvetica, sans-serif',
        fontSize: '18px',
        fontWeight: '600'
      },
      name: 'header2'
    },
    header3: {
      style: {
        color: '#333333',
        fontFamily: ' "open sans", helvetica, sans-serif',
        fontSize: '18px',
        fontWeight: '600'
      },
      name: 'header3'
    },
    header1: {
      style: {
        color: '#1d2b54',
        fontFamily: ' "open sans", helvetica, sans-serif',
        fontSize: '24px',
        fontWeight: '700'
      },
      name: 'header1'
    },
    subhead1: {
      style: {
        color: '#919191',
        fontFamily: ' "open sans", helvetica, sans-serif',
        fontSize: '16px',
        fontWeight: '600'
      },
      name: 'subhead1'
    }
  },
  fonts: [
    {
      url: '',
      fontFamily: ' "open sans", helvetica, sans-serif',
      name: 'open sans',
      id: 1
    },
    {
      url: 'https://www.filepicker.io/api/file/ZJ57tCVJSzOeQTfGkMuy?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
      fontFamily: '"Rooney Regular", helvetica, sans-serif',
      name: 'Rooney Regular',
      id: 237
    },
    {
      url: 'https://www.filepicker.io/api/file/tHPV9JZQgb9ZNu5Sj1gZ?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
      fontFamily: '"Rooney Bold", helvetica, sans-serif',
      name: 'Rooney Bold',
      id: 239
    },
    {
      url: 'https://www.filepicker.io/api/file/RJkKtl6wTlKd8v2ZLGKz?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
      fontFamily: '"Proxima Nova Extra Bold", helvetica, sans-serif',
      name: 'Proxima Nova Extra Bold',
      id: 293
    }
  ],
  fontSizes: [
    '8px',
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '36px'
  ],
  stylesheet: 'https://staging.publet.com/api/2/theme/16/fonts.css',
  publications: [
    {
      url: '/api/2/publication/822/',
      slug: 'the-content-strategy-cqcu0',
      name: 'The Content Strategy',
      id: 822
    },
    {
      url: '/api/2/publication/840/',
      slug: 'the-finance-issue-mu0zn',
      name: 'The Finance Issue',
      id: 840
    }
  ],
  imageStyles: {
    default: {
      style: { },
      name: 'default'
    },
    card: {
      style: {
        borderColor: 'silver',
        borderRadius: '2px',
        padding: '.5em',
        borderWidth: '1px',
        background: 'whitesmoke',
        borderStyle: 'solid'
      },
      name: 'card'
    }
  },
  videoStyles: {
    default: {
      style: { },
      name: 'default'
    },
    card: {
      style: {
        borderColor: 'silver',
        borderRadius: '2px',
        padding: '.5em',
        borderWidth: '1px',
        background: 'whitesmoke',
        borderStyle: 'solid'
      },
      name: 'card'
    }
  },
  id: 16
}



exports.article = {
  orderHuman: 'one',
  pdfUrl: null,
  name: 'Lol, cats',
  liveUrl: 'http://publications.publet.com/alex-test-group-o5x37/sandbox-test-pub-on0bb/#one',
  id: 134,
  sections: [
    {
      style: { },
      bg: {
        color: null,
        imageUrl: null,
        fullHeight: false
      },
      layout: 'OneCol',
      id: 1,
      columns: [
        [
          {
            content: {
              url: 'https://www.filepicker.io/api/file/p4iYuA8tSSSuXcYCjeyC?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
              caption: '',
              alt: 'placeholder image for 350x150 image',
              style: 'image-default'
            },
            classes: [ ],
            type: 'ImageBlock',
            id: 16
          }
        ]
      ]
    },
    {
      style: { },
      bg: {
        color: '#FFF',
        imageUrl: null,
        fullHeight: false
      },
      layout: 'OneCol',
      editable: true,
      id: 310,
      columns: [
        [
          {
            content: {
              url: 'https://www.filepicker.io/api/file/F2jRofhTSVKMkcsHs4yj?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
              caption: '',
              style: 'image-default',
              thumbUrl: 'https://placehold.it/350x150'
            },
            classes: [ ],
            type: 'VideoBlock',
            id: 316
          }
        ]
      ]
    },
    {
      style: { },
      bg: {
        color: null,
        imageUrl: null,
        fullHeight: false
      },
      layout: 'TwoCol',
      id: 1,
      columns: [
        [
          {
            content: {
              text: `<div><span style='font-family: 'Proxima Nova Extra Bold', helvetica, sans-serif;'><span style='font-size: 36px;'>Content Marketing’s Future Is in the Hands of Two Groups, and They’re Not Talking&nbsp;</span></span></div>`,
              style: 'paragraph'
            },
            classes: [ ],
            type: 'TextBlock',
            id: 311
          },
          {
            content: {
              text: `<div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>By Joe Coleman</span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Photograph by Kyle Dean Reinford </span></span></div><div><br></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Over the last four years at Contently, we’ve seen content marketing go from something no one was talking about to something brands found interesting (but not worthy of much budget) to the number one digital priority for brands. To say money is now pouring into content marketing would be an understatement. It’s happening now from all sides, from inside CMOs’ offices and through their agencies alike. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Lasting content marketing success requires more than just writing a check, however, and the rapid growth of content marketing has left many initiatives living in silos, disconnected from a brand’s broader content strategy.</span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>&nbsp;</span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Nowhere is this more evident than in the gulf between those responsible for formulating and enacting a brand’s long-term content strategy (usually the CMO’s office) and those responsible for getting that content in front of the right audience (the media agency). </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Why is this a problem? Well, as the industry inevitably moves beyond “check the box” mode—where just doing some form of content marketing is enough to show progress—to more mature programs that require real business results to justify the expenses, it will be necessary to break down silos in order to build content marketing programs that really work. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Here are a few areas where we’ve seen our customers succeed in bridging this gap: </span></span></div><div><br></div><div><span style='font-family: 'Rooney Bold', helvetica, sans-serif;'><span style='font-size: 16px;'>1. Multi-agency cooperation</span></span><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>&nbsp;</span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Having a brand’s agencies as the driving force behind content adoption helps generate a holistic strategy. When PR, media, and creative agencies collaborate on content strategy, it means all the bases (creation and distribution) can be covered from the outset. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Bold', helvetica, sans-serif;'><span style='font-size: 16px;'>2. Media agencies moving beyond campaign- based thinking </span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>The true power of content marketing is building owned audiences—putting the brand in a position where it’s connecting directly with its potential customers, instead of relying on the traditional media properties of old for access to consumers. The infrastructure now exists for media buyers to drive traffic to brand-owned properties at scale; it simply represents a change in thinking. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Bold', helvetica, sans-serif;'><span style='font-size: 16px;'>3. Brands fostering a culture of content </span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>The content teams that sit within brands can do a bet- ter job of packaging their content and making it available to their agency partners. There are tools that can help them do this. But to truly close the CMO–agency chasm, it’s essential to foster a culture of content and evan- gelize internally. Long-term success takes buy-in at the highest levels. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Content marketing is here to stay—but content without proper distribution can’t be effective, nor can distribution work without a coherent content strategy. The best content marketers will find a way to bridge the gap. </span></span></div><div><br></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'><i>Joe Coleman (@JoeDColeman) is the CEO of Contently.</i>&nbsp;</span></span></div>`,
              style: 'paragraph'
            },
            classes: [ ],
            type: 'TextBlock',
            id: 312
          }
        ],
        [
          {
            content: {
              url: 'https://www.filepicker.io/api/file/Mpvvtb0wRkaQVQbJk55Y?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
              caption: '',
              alt: 'placeholder image for 350x150 image',
              style: 'image-default'
            },
            classes: [ ],
            type: 'ImageBlock',
            id: 89
          },
          {
            content: {
              url: 'https://www.filepicker.io/api/file/HCT048bMQSSvHVFfOjiY?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
              caption: '',
              alt: 'placeholder image for 350x150 image',
              style: 'image-default'
            },
            classes: [ ],
            type: 'ImageBlock',
            id: 90
          }
        ]
      ]
    },
    {
      style: { },
      bg: {
        color: '#FFF',
        imageUrl: null,
        fullHeight: false
      },
      layout: 'TwoCol',
      editable: true,
      id: 92,
      columns: [
        [
          {
            content: {
              url: 'https://www.filepicker.io/api/file/y4qnU2PYTGGwloRD2uaC?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
              caption: '',
              alt: 'placeholder image for 350x150 image',
              style: 'image-default'
            },
            classes: [ ],
            type: 'ImageBlock',
            id: 209
          },
          {
            content: {
              url: 'https://www.filepicker.io/api/file/JK9tyYYYQfGDA94XxhKP?signature=9a800a1507049e983e3c39198072b927979cdacaf89b7c237f8f283de1e5667c&policy=eyJjYWxsIjogWyJyZWFkIiwgImNvbnZlcnQiXSwgImV4cGlyeSI6ICIyNTI0NjQwNDAwIn0=',
              caption: '',
              alt: 'placeholder image for 350x150 image',
              style: 'image-default'
            },
            classes: [ ],
            type: 'ImageBlock',
            id: 210
          }
        ],
        [
          {
            content: {
              text: `<div><span style='font-family: 'Proxima Nova Extra Bold', helvetica, sans-serif;'><span style='font-size: 36px;'>Content Marketers Need a Better Formula for Success&nbsp;</span></span></div>`,
              style: 'paragraph'
            },
            classes: [ ],
            type: 'TextBlock',
            id: 191
          },
          {
            content: {
              text: `<div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>By Ray Cheng</span></span></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Photograph by Kyle Dean Reinford </span></span></div><div><br></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Content marketing has a problem that not enough people are talking about: How do I accurately measure the true value of the content I create? </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>Content performance metrics are still being measured in the form of opens, clicks, pageviews, and shares. Thus, content marketers are getting better at leveraging a common formula: clickable headlines + paid distribution = numbers that look like success. Unfortunately, that success is often an illusion. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>The real value generated from such metrics for a given content program could actually be zero, because audience engagement and loyalty may be limited to just that one campaign. The harder it is for content marketers to prove that their content results directly tie into a company’s overall financial success, the harder it is for them to ask for more money to produce better content and truly engage audiences over time. This is a huge mistake and a disservice to the marketing profession. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>At companies that are attempting to link content more directly to shareholder KPIs, content marketers are quickly evolving into hybrid creatures: half editors, half data scientists. To succeed, these Chimeras need a formula that goes one step further than attention time. The formula needs to consider the lifetime value of each audience member and, more importantly, how to maximize that value from the best audience segments. </span></span></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>I’ve spent a lot of time in my career thinking about better ways to prove marketing attribution. That effort has evolved with the help of the latest marketing automation technologies. At Contently, we have the pleasure of looking at a treasure trove of content performance data in our own technology platform, which has allowed me to develop a pretty exciting formula for the content marketing world. We have lovingly named it ROCI [rock-ee], short for Return on Content Investment: </span></span></div><div><br></div><div style='text-align: center;'><span style='font-family: 'Rooney Bold', helvetica, sans-serif;'><span style='font-size: 16px;'>The ROCI formula:</span></span></div><div style='text-align: center;'><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>(Revenue Attributed to All Content Marketing Assets – Total Content Marketing Spend) </span></span></div><div style='text-align: center;'><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>+ </span></span></div><div style='text-align: center;'><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>(Share of Audience Attention × Fair Market $ Value of Target Audience) </span></span></div><div style='text-align: center;'><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'>It’s by no means a finished theorem, as solving the problem of true content value over time is incredibly hard and unique to each business model. But over the next few months, we will be working with the best minds in the marketing and data worlds to test and adapt this formula. If you have any thoughts, opinions, or insights, I hope you’ll let us know. </span></span></div><div><br></div><div><br></div><div><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><span style='font-size: 16px;'><i>Ray Cheng (@Ray_Jing) is the VP of Marketing at Contently.&nbsp;</i></span></span></div>`,
              style: 'paragraph'
            },
            classes: [ ],
            type: 'TextBlock',
            id: 192
          }
        ]
      ]
    },
    {
      style: { },
      bg: {
        color: '#FFF',
        imageUrl: null,
        fullHeight: false
      },
      layout: 'OneCol',
      editable: true,
      id: 24,
      columns: [
        [
          {
            content: {
              text: '<div>See the full Publet publication <a href="http://publications.publet.com/contently-eb9pw/the-finance-issue-mu0zn/" target="_blank">here</a></div>',
              style: 'paragraph'
            },
            classes: [ ],
            type: 'TextBlock',
            id: 80
          }
        ]
      ]
    },
    {
      style: { },
      bg: {
        color: '#FFF',
        imageUrl: null,
        fullHeight: false
      },
      layout: 'OneCol',
      editable: true,
      id: 318,
      columns: [
        [
          {
            content: {
              text: `<div style='text-align: center;'><b><span style='font-size: 18px;'><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'>Want to see more of Contently's awesome content? </span></span></b></div><div style='text-align: center;'><b><span style='font-size: 18px;'><span style='font-family: 'Rooney Regular', helvetica, sans-serif;'><a href='https://contently.com/strategist/2014/06/12/contently-quarterly-finance-springsummer-2015-pdf/'>Go check it out here!</a></span></span></b></div>`
            },
            classes: [ ],
            type: 'TextBlock',
            id: 326
          }
        ]
      ]
    }
  ],
  order: 1
}
