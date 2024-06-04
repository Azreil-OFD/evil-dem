const defaultValue = {
    applications: [],
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
        addApplication(application) {
            this.applications.push(application)
        }
    }
})