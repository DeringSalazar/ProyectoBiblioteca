import pool from '../Database/db.js';

class SubscriptionsModel {

    async getSubscriptionByUser(id) {
        try {
            const result = await pool.execute('CALL sp_suscripciones_by_usuario(?)', [id]);
            return result[0];
        } catch (error) {
            console.error('Error finding subscription by user:', error);
            throw error;
        }
    }

    async getSubscriptionById(id) {
        try {
            const result = await pool.execute('CALL sp_suscripciones_getid(?)', [id]);
            return result[0];
        } catch (error) {
            console.error('Error finding subscription by ID:', error);
            throw error;
        }
    }

    async getFeedByUser(id) {
        try {
            const [rows] = await pool.execute('CALL sp_feed_by_usuario(?)', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error getting feed by user:', error);
            throw error;
        }
    }

    async createSubscription(subscription) {
        if (!subscription) {
            throw new Error("Subscription data is undefined");
        }
        const {id_usuario, id_categoria, notificaciones} = subscription;
        try {
            const result = await pool.execute('CALL sp_suscripciones_create(?, ?, ?)',
                [id_usuario, id_categoria, notificaciones]);
            return result;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    }

    async updateSubscription( subscription ) {
        if (!subscription) {
            throw new Error("Subscription data is undefined");
        }
        const {id, notificaciones} = subscription;
        try {
            const result = await pool.execute('CALL sp_suscripciones_update(?, ?)',
                [id, notificaciones]);
            return result;
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw error;
        }
    }

    async deleteSubscription(id) {
        try {
            const result = await pool.execute('CALL sp_suscripciones_delete(?)', [id]);
            return result;
        } catch (error) {
            console.error('Error deleting subscription:', error);
            throw error;
        }
    }
}

export default new SubscriptionsModel();