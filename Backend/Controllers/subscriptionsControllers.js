import subscriptionsServices from "../Services/subscriptionsServices.js";

class SubscriptionsController {

    async getSubscriptionByUser(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const subscription = await subscriptionsServices.getSubscriptionByUser(id);
            res.status(200).json({
                success: true,
                message: 'Subscription obtained correctly',
                subscription: subscription[0][0],
            });
        } catch (error) {
            console.error('Error in getSubscriptionByUser:', error);
            res.status(500).json({
                success: false,
                message: `Error obtaining subscription by user with id ${id}`,
                error: error.message,
            });
        }
    }

    async getSubscriptionById(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const subscription = await subscriptionsServices.getSubscriptionById(id);
            res.status(200).json({
                success: true,
                message: 'Subscription obtained correctly',
                subscription: subscription[0][0],
            });
        } catch (error) {
            console.error('Error in getSubscriptionById:', error);
            res.status(500).json({
                success: false,
                message: `Error obtaining subscription by id ${id}`,
                error: error.message,
            });
        }
    }

    async getFeedByUser(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const feed = await subscriptionsServices.getFeedByUser(id);
            res.status(200).json({
                success: true,
                message: 'Feed obtained correctly',
                feed: feed[0],
            });
        } catch (error) {
            console.error('Error in getFeedByUser:', error);
            res.status(500).json({
                success: false,
                message: `Error obtaining feed by user with id ${id}`,
                error: error.message,
            });
        }
    }

    async createSubscription(req = Request, res = Response) {
        const { id_usuario, id_categoria, notificaciones } = req.body;
        try {
            const subscription = await subscriptionsServices.createSubscription({ id_usuario, id_categoria, notificaciones });
            res.status(201).json({
                success: true,
                message: 'Subscription created correctly',
            });
        } catch (error) {
            console.error('Error in createSubscription:', error);
            if (error.code === 'MISSING_DATA') {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: id_usuario, id_categoria, notificaciones'
                });
            }
            if (error.code === 'DUPLICATE') {
                return res.status(409).json({
                    success: false,
                    message: 'The category already exists. Duplicates are not allowed.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error creating subscription',
                error: error.message,
            });
        }
    }

    async updateSubscription(req = Request, res = Response) {
        const { id, notificaciones } = req.body;
        try {
            await subscriptionsServices.updateSubscription({ id, notificaciones });
            res.status(200).json({
                success: true,
                message: 'Subscription updated correctly',
            });
        } catch (error) {
            console.error('Error in updateSubscription:', error);
            if (error.code === 'MISSING_DATA') {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: id, notificaciones'
                });
            }
            if (error.code === 'DUPLICATE') {
                return res.status(409).json({
                    success: false,
                    message: 'The category already exists. Duplicates are not allowed.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error updating subscription',
                error: error.message,
            });
        }
    }

    async deleteSubscription(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const subscription = await subscriptionsServices.deleteSubscription(id);
            res.status(200).json({
                success: true,
                message: 'Subscription deleted correctly',
            });
        } catch (error) {
            console.error('Error in deleteSubscription:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting subscription',
                error: error.message,
            });
        }
    }
}

export default new SubscriptionsController();