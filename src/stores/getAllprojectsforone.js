import axios from 'axios';
import {
    defineStore
} from 'pinia';

export const getAllProjctsForOne = defineStore('projects', {
    state: () => ({
        allProjects: [],
        projectId: null
    }),
    actions: {
        async getprojects(api) {
            this.projectId = localStorage.getItem('id');

            const headers = {
                Authorization:'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json', 
            };

            await axios.post(api,{},{ headers })
                .then((res) => {
                    if (res.status == 200) {
                        this.allProjects = res.data.data.filter((project) => project.user_id == this.projectId);
                    }
                }).catch((error) => console.log(error));
        }
    }

})