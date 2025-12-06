import subscriptionsModels from "../Models/subscriptionsModels.js";

class SubscriptionsServices {

    async getSubscriptionByUser(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        try {
            return await subscriptionsModels.getSubscriptionByUser(id);
        } catch (error) {
            console.error('Error in subscriptionsServices.getSubscriptionByUser:', error);
            throw error;
        }
    }

    async getSubscriptionById(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        try {
            return await subscriptionsModels.getSubscriptionById(id);
        } catch (error) {
            console.error('Error in subscriptionsServices.getSubscriptionById:', error);
            throw error;
        }
    }

    async getFeedByUser(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        try {
            const feed = await subscriptionsModels.getFeedByUser(id);
            return feed;
        } catch (error) {
            console.error('Error in subscriptionsServices.getFeedByUser:', error);
            throw error;
        }
    }

    async createSubscription(subscription) {
        const { id_usuario, id_categoria, notificaciones } = subscription;
        if (!id_usuario || !id_categoria || !notificaciones) {
            throw new Error("Data is missing: Id_usuario, id_categoria, notificaciones");
        }
        try {
            return await subscriptionsModels.createSubscription(subscription);
        } catch (error) {
            console.error('Error in subscriptionsServices.createSubscription:', error);
            throw error;
        }
    }

    async updateSubscription(subscription) {
        const { id, notificaciones } = subscription;
        if (id === undefined || notificaciones === undefined) {
            throw new Error("Data is missing: id, notificaciones");
        }
        try {
            return await subscriptionsModels.updateSubscription(subscription);
        } catch (error) {
            console.error('Error in subscriptionsServices.updateSubscription:', error);
            throw error;
        }
    }

    async deleteSubscription(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        try {
            return await subscriptionsModels.deleteSubscription(id);
        } catch (error) {
            console.error('Error in subscriptionsServices.deleteSubscription:', error);
            throw error;
        }
    }
}

export default new SubscriptionsServices();