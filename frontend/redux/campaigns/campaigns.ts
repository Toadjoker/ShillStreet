const SET_CAMPAIGNS = "campaigns/SET_CAMPAIGNS"
const SET_CAMPAIGN = "campaigns/SET_CAMPAIGN"
const GET_SINGLE_CAMPAIGN = "campaigns/GET_SINGLE_CAMPAIGN"

// init state
const initialState: any = {
    campaign: {},

    campaigns: [
        {
            id: 0,
            campaign: "/images/Chainlink_logo.png",
            address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
            timeAccepted: {
                date: "23-03-29",
                time: "10:08:17",
            },
            title: "Chainlink CCIP",
            vaultSize: "30000 $STC",
            currentBalance: "Replace",
            state: "Deployed",
            threadComplete: "Replace",
            utilization: "Replace",
            reachGenerated: "1,753 Users",
            threadEarnings: "Replace",
            shareOfCampaignEarned: "1.25%",
            impressions: "50,000",
            threadDetails: ["1.Should", "2.Should"],
            overview:
                "What is cross-chain interoperability? Cross-chain interoperability enables different blockchains to communicate with each other, giving smart contracts the ability to read and write data to and from other blockchains via cross-chain communication. A global standard for developers to easily build secure cross-chain services and applications. With a universal messaging interface, smart contracts can communicate across multiple blockchain networks, eliminating the need for developers to write custom code for building chain-specific integrations. CCIP opens up a new category of DeFi applications that can be built by developers for multi-chain ecosystems.",
            tokenomics:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula.",
        },
        {
            id: 1,
            campaign: "https://icodrops.com/wp-content/uploads/2021/06/dopex_logo.png",
            address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
            timeAccepted: {
                date: "23-03-29",
                time: "10:08:17",
            },
            title: "Poison Finance",
            state: "Not deployed yet",
            vaultSize: "0",
            currentBalance: "0",
            threadComplete: 0,
            utilization: 0,
            reachGenerated: "1,753 Users",
            threadEarnings: "$21.50 USDC",
            shareOfCampaignEarned: "1.25%",
            impressions: "50,000",
            threadDetails: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula. Nam nec metus sed massa dignissim rhoncus a condimentum nunc.",
            ],
            overview:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula. Nam nec metus sed massa dignissim rhoncus a condimentum nunc.",
            tokenomics:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula.",
            products:
                "• Single Staking Options Vaults (SSOVs) <br />\
        • Options Liquiditu Pools <br />\
        • Atlantic Options <br />• Atlantic Straddles",
        },
        {
            id: 2,
            campaign:
                "data:image/png;base64,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",
            address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
            timeAccepted: {
                date: "23-03-25",
                time: "12:23:10",
            },
            title: "Pepe's Game",
            state: "Not deployed yet",
            vaultSize: "0",
            currentBalance: "0",
            threadComplete: 0,
            utilization: 0,
            reachGenerated: "1,934 Users",
            threadEarnings: "$22.70 USDC",
            shareOfCampaignEarned: "1.10%",
            impressions: "10,000",
            threadDetails: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula. Nam nec metus sed massa dignissim rhoncus a condimentum nunc.",
            ],

            tokenomics:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula.",
            products:
                "• Single Staking Options Vaults (SSOVs) <br />\
        • Options Liquiditu Pools <br />\
        • Atlantic Options <br />• Atlantic Straddles",
        },
        {
            id: 3,
            campaign:
                "data:image/jpeg;base64,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",
            address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
            timeAccepted: {
                date: "23-03-17",
                time: "5:45:28",
            },
            title: "Jane's DAO",
            state: "Not deployed yet",
            vaultSize: "0",
            threadComplete: 0,
            currentBalance: "0",
            utilization: 0,
            reachGenerated: "2,849 Users",
            threadEarnings: "$27.23 USDC",
            shareOfCampaignEarned: "0.79%",
            impressions: "20,000",
            threadDetails: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula. Nam nec metus sed massa dignissim rhoncus a condimentum nunc.",
            ],
            overview:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula. Nam nec metus sed massa dignissim rhoncus a condimentum nunc.",
            tokenomics:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat lectus, posuere in venenatis non, varius in libero. Maecenas a nibh et erat molestie pharetra. Fusce interdum nisl nunc. Mauris sit amet nibh viverra, sollicitudin leo commodo, porta ligula.",
            products:
                "• Single Staking Options Vaults (SSOVs) <br />\
        • Options Liquiditu Pools <br />\
        • Atlantic Options <br />• Atlantic Straddles",
        },
    ],
}

// Actions
export const setCampaignsAction = (payload: any) => ({
    type: SET_CAMPAIGNS,
    payload,
})

export const setCampaignAction = (payload: any) => ({
    type: SET_CAMPAIGN,
    payload,
})

// reducer
export const campaignsReducer = (state: any = initialState, action: any = undefined) => {
    switch (action.type) {
        case SET_CAMPAIGNS:
            return {
                ...state,
                campaigns: action.payload,
            }
        case SET_CAMPAIGN:
            return {
                ...state,
                campaign: state.campaigns.filter(
                    (campaign: any) => campaign.id === action.payload
                )[0],
            }

        default:
            return state
    }
}
