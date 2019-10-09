export interface AdalUser {
    aio: string;
    aud: string;
    exp: Date; /* expiration date */
    family_name: string; /* last name */
    given_name: string;
    iat: Date;
    ipaddr: string; /* ip address */
    iss: string;
    name: string;
    nbf: Date;
    nonce: string; /* guid */
    oid: string; /* guid */
    sub: string; /* token */
    tid: string; /* guid */
    unique_name: string; /* sign in user name or UPN */
    upn: string;
    uti: string; /* token */
    ver: string; /** version */
}

    /*
    aio: "42RgYDil0ufYqZlQ6xhW3n9rseLCmrSiPBNfLflrwh+XXzVruAoA"
    amr: ["pwd"]
    aud: "86800445-8f75-4321-a739-5c071410e148"
    exp: 1540830963
    family_name: "Roberts"
    given_name: "Jeff"
    iat: 1540827063
    ipaddr: "68.1.179.24"
    iss: "https://sts.windows.net/2d1a1658-e518-492f-902c-490eb845fc49/"
    name: "Jeff Roberts"
    nbf: 1540827063
    nonce: "ce09ebd3-679a-46b4-a6fc-acf132be9803"
    oid: "98b3b578-1eb8-4bf2-87e9-24038481963b"
    sub: "6ODSV1HW0kw3VMBK1SSqboqrdtZMCleqjaK6qGquMRw"
    tid: "2d1a1658-e518-492f-902c-490eb845fc49"
    unique_name: "jerober@BTSSSDEV1.onmicrosoft.com"
    upn: "jerober@BTSSSDEV1.onmicrosoft.com"
    uti: "b9os6AgJQ0abe--Z19FZAA"
    ver: "1.0"
    */
