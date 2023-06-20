"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = require("mongoose");
const order_model_1 = require("./order.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the cow and buyer IDs are valid ObjectIds
    const isValidCowId = mongoose_1.Types.ObjectId.isValid(cowId);
    const isValidBuyerId = mongoose_1.Types.ObjectId.isValid(buyerId);
    if (!isValidCowId || !isValidBuyerId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid cow or buyer ID');
    }
    // Find the cow by ID
    const selectedCow = yield cow_model_1.Cow.findById(cowId);
    if (!selectedCow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
    // Find the buyer by ID
    const selectedBuyer = yield user_model_1.User.findById(buyerId);
    if (!selectedBuyer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Buyer not found');
    }
    // Check if the buyer has enough money to buy the cow
    if (selectedBuyer.budget < selectedCow.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient funds');
    }
    // Start a session for the transaction
    const session = yield order_model_1.Order.startSession();
    session.startTransaction();
    try {
        // Update the cow's label to 'sold out'
        selectedCow.label = 'sold out';
        yield selectedCow.save({ session });
        // Deduct the cost of the cow from the buyer's budget
        selectedBuyer.budget -= selectedCow.price;
        yield selectedBuyer.save({ session });
        // Create the order
        const order = new order_model_1.Order({
            cow: selectedCow._id,
            buyer: selectedBuyer._id,
        });
        yield order.save({ session });
        // Update the seller's income
        const seller = yield user_model_1.User.findByIdAndUpdate(selectedCow.seller, { $inc: { income: selectedCow.price } }, { new: true, session });
        if (!seller) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Seller not found');
        }
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        // Abort the transaction if an error occurs
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
