export const accountModel = (raw:any)=>{

    const data = raw.data;

    delete raw.data

    return{
        ...raw,
        ...data,

        get role(){            
            return data?.roles[0].name
        },

        get isAdmin(){
            return data.role === 'administrator'
        },

        get isCustomer(){
            return data.role === 'customer'
        },

        get isTechnician(){
            return data.role === 'technician'
        }
    }
}