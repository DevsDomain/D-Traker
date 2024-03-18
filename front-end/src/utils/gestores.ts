export interface gestoresType {
    id: string,
    name: string,
    projeto: string,
    papel: string,
    status:"Active" | 'Suspended' |'Closed',
    isActive: boolean
}

export const gestores: gestoresType[] = [
    {
        id: 'USR-010',
        name: 'Alcides Antonio',
        projeto: 'alcides.antonio@devias.io',
        papel: 'Revisor',
        status: "Active",
        isActive: true,

    },
    {
        id: 'USR-009',
        name: 'Marcus Finn',
        projeto: 'marcus.finn@devias.io',
        papel: 'Revisor',
        status: "Active",
        isActive: true,

    },
    {
        id: 'USR-008',
        name: 'Jie Yan',
        projeto: 'jie.yan.song@devias.io',
        papel: 'Revisor',
        status: "Active",
        isActive: true,

    },
    {
        id: 'USR-007',
        name: 'Nasimiyu Danai',
        projeto: 'nasimiyu.danai@devias.io',
        papel: 'Revisor',
        status: "Suspended",
        isActive: true,

    },
    {
        id: 'USR-006',
        name: 'Iulia Albu',
        projeto: 'iulia.albu@devias.io',
        papel: 'Revisor',
        status: "Active",
        isActive: true,

    },
    {
        id: 'USR-005',
        name: 'Fran Perez',
        projeto: 'fran.perez@devias.io',
        papel: 'Revisor',
        status: "Suspended",
        isActive: true,

    },

    {
        id: 'USR-004',
        name: 'Penjani Inyene',
        projeto: 'penjani.inyene@devias.io',
        papel: 'Revisor',
        status: "Active",
        isActive: false,

    },
    {
        id: 'USR-003',
        name: 'Carson Darrin',
        projeto: 'carson.darrin@devias.io',
        papel: 'Revisor',
        status: "Active",
        isActive: true,

    },
    {
        id: 'USR-002',
        name: 'Siegbert Gottfried',
        projeto: 'siegbert.gottfried@devias.io',
        papel: 'Editor',
        status: "Closed",
        isActive: true,

    },
    {
        id: 'USR-001',
        name: 'Miron Vitold',
        projeto: 'miron.vitold@devias.io',
        papel: 'Editor',
        status: "Active",
        isActive: false,

    },
]