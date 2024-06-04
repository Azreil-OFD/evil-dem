interface Application {
    clientId: number;
    createdAt: string;
    description: string;
    equipment: string;
    executorId: number | null;
    id: number;
    issueType: string;
    status: string;
}

const defaultValue = {
    applications: Array<Application>,
    user: null
}


export const useApplicationsStore = defineStore("applications", {
    state: () => defaultValue,
    actions: {
        async fetchApplications() {
            try {
                const data = await $fetch("/api/applications", { method: "POST" })
                this.applications = data.data
                this.user = data.user

            } catch (error) {
                console.error('Failed to fetch applications:', error);
            }
        },
        addApplication(application: Application) {
            this.$patch
            this.applications.push(application)
        }
    }
})