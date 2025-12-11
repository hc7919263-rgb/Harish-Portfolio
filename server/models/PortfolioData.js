import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    // Store data as a single document for simplicity (like db.json)
    // We will use a fixed ID ("main") to find it.
    _id: { type: String, default: 'main' },

    projects: { type: Array, default: [] },
    foundation: {
        academic: { type: Array, default: [] },
        certifications: { type: Array, default: [] },
        activities: { type: Array, default: [] }
    },
    faqs: { type: Array, default: [] },
    skills: {
        technical: { type: Array, default: [] },
        soft: { type: Array, default: [] }
    },
    // WebAuthn Passkeys for Admin
    adminPasskeys: { type: Array, default: [] }, // Stores { id, publicKey, counter, transports }
    meta: {
        aboutText: String,
        resumeLastUpdated: String,
        profileLastUpdated: String,
        resumeDownloads: { type: Number, default: 0 },
        totalVisitors: { type: Number, default: 0 }
    }
}, { strict: false }); // Strict false allows flexibility if we add new fields later

export const PortfolioData = mongoose.model('PortfolioData', PortfolioSchema);
