import { Portfolio } from "@/models/portfolio";
// TODO: Migrate alt content to cloudinary as that can store this information for us (and already stores tags).
// All this needs to end up being is the external (to cloudinary) data like id/title/content + media public ids only.

const Portfolios: Portfolio[] =
    [
        {
            id: 'katlan-remodel',
            title: 'Complete Kitchen Remodel',
            content: `<p class="lead">This was a complete kitchen remodel
with an enlarged island with a farmhouse sink with custom granite.</p> `,
            media: [
                {
                    public_id: 'TON/katlan-kitchen/2016-11-22_17.15.41',
                    alt: 'Enlarged island with farm house sink.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/katlan-kitchen/2016-11-22_17.15.17',
                    alt: 'Kitchen with under cabinet lighting.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/katlan-kitchen/2018-08-22_17.15.13',
                    alt: 'Custom cabinets/lockers for mudroom/laundry room remodel.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/katlan-kitchen/2018-08-07_16.27.15',
                    alt: 'Custom quad washer/dryer enclosure.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/katlan-kitchen/2016-11-28_11.53.47',
                    alt: 'Raised cabinet above microwave range. Highlights crown molding.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/katlan-kitchen/2016-11-28_11.53.20',
                    alt: 'Island with farm sink',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                }
            ]
        },
        {
            id: 'dj-custom-cabinets',
            title: 'Custom cabinets',
            content: '<p class="lead">Custom cabinets built into ledge stone fireplace.</p>',
            media: [
                {
                    public_id: 'TON/dj-custom-cabinets/2016-09-28_10.10.02',
                    alt: 'Cabinets built from aged-oak to match existing antique table (foreground) with slate doors and countertop.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/dj-custom-cabinets/2016-11-17_16.01.56',
                    alt: 'Custom mantle with slate highlight to match cabinets.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/dj-custom-cabinets/2016-09-28_10.09.52',
                    alt: 'Custom cabinet with slate doors and countertop.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/dj-custom-cabinets/2017-02-01_14.32.29',
                    alt: 'Custom oak end table with slate top.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                }
            ]
        },
        {
            id: 'des-kitchen',
            title: 'Complete Kitchen Remodel',
            content: '<p class="lead">Complete custom kitchen remodel with additional custom cabinets.</p>',
            media: [
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.50.20',
                    alt: 'Custom display cabinet, custom hood above gas cooktop.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.50.44',
                    alt: 'Farmhouse sink',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.50.28',
                    alt: 'Gas cooktop / electric oven with custom highlight columns.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.50.37',
                    alt: '11ft island ',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.40.28',
                    alt: 'Custom columns at sit-down counter of island',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.50.10',
                    alt: 'Wine fridge on right and pot filler faucet can be seen at range',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/des-kitchen/2017-06-17_14.39.53',
                    alt: 'Custom refrigerator enclosure',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                }
            ]
        },
        {
            id: 'dlw-custom-cabinets',
            title: 'Custom display cabinets',
            content: '<p class="lead">Custom dining room full-length hutch and custom display cabinets at fireplace.</p>',
            media: [
                {
                    public_id: 'TON/dlw-custom-cabinets/2018-02-20_11.28.08',
                    alt: 'Custom dining room full length hutch.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/dlw-custom-cabinets/2017-11-06_15.41.40',
                    alt: 'Display cabinets around fireplace with glass shelves.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                }
            ]
        },
        {
            id: 'bath-100',
            title: 'Complete bath remodel',
            content: '<p class="lead">Large bath remodel with custom cabinets.</p>',
            media: [
                {
                    public_id: 'TON/bath-100/000_0163',
                    alt: 'Soaking tub and custom deck with copper accessories.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/bath-100/000_0162',
                    alt: 'Wainscot / Venetian plaster walls and matching cabinet.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/bath-100/000_0159',
                    alt: 'Custom shower with body washes, custom shelving.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/bath-100/000_0161',
                    alt: 'Custom vanity with copper sinks and fixtures.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                }
            ]
        },
        {
            id: 'domingo-kitchen',
            title: 'Complete Kitchen Remodel',
            content: '<p class="lead">Complete kitchen remodel with honey glaze cabinet. Custom tile appointments.</p>',
            media: [
                {
                    public_id: 'TON/domingo-kitchen/000_0059',
                    alt: 'Glass door highlights, recessed tile shelf above cooktop. Open bookshelf at end of island.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/domingo-kitchen/000_0061',
                    alt: 'Glass highlight door with sit down counter on peninsula (left).',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                },
                {
                    public_id: 'TON/domingo-kitchen/000_0064',
                    alt: 'Custom recessed shelf above cooktop.',
                    tags: [
                        'custom',
                        'cabinets'
                    ]
                }
            ]
        }
    ];

export default Portfolios