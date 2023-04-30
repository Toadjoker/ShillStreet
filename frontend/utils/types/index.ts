// registration type
export type RegisterType = {
    name: string
    email: string
    walletAddress: string
    privateString: string
}

export type WaitListType = {
    email: string
}

export type LoginType = {
    walletAddress: string
    privateString: string
}
