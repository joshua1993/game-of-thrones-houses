export interface House {
    id: string;
    url: string;
    name: string;
    region: string;
    coatOfArms: string;
    words: string;
    titles: Array<string>;
    seats: Array<string>;
    currentLord: any;
    heir: any;
    overlord: any;
    founded: string;
    founder: any;
    diedOut: string;
    ancestralWeapons: Array<string>;
    cadetBranches: Array<any>;
    swornMembers: Array<any>;
}
