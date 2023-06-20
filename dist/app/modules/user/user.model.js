"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true,
    },
    name: {
        required: true,
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.pre('save', function (next) {
    if (!this.role) {
        this.role = 'buyer';
    }
    if (this.role === 'buyer' && typeof this.income !== 'number') {
        this.income = 0;
    }
    if (this.role === 'seller') {
        // Set required fields for the 'buyer' role
        if (!this.income) {
            return next(new Error("income is required for 'seller' role."));
        }
    }
    next();
});
exports.User = (0, mongoose_1.model)('User', userSchema);
