const stringSimilarity = require('string-similarity');
const LostItem = require('../models/lostitem');
const FoundItem = require('../models/founditem');
const Match = require('../models/match');

// Helpers
const normalizeString = (str) => (str || '').toString().trim().toLowerCase();
const extractTrainNumber = (train) => (train || '').toString().replace(/\D/g, '');
const getDateDiffInDays = (d1, d2) => {
  if (!d1 || !d2) return null;
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  if (isNaN(date1) || isNaN(date2)) return null;
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Matching Logic
const matchLostAndFound = (lostList, foundList) => {
  const suggestions = [];

  lostList.forEach(lost => {
    foundList.forEach(found => {
      const lostName = normalizeString(lost.itemname);
      const foundName = normalizeString(found.itemname);
      const similarity = stringSimilarity.compareTwoStrings(lostName, foundName);

      const lostTrain = extractTrainNumber(lost.trainNumber);
      const foundTrain = extractTrainNumber(found.trainNumber);
      const trainMatch = !!(lostTrain && foundTrain && lostTrain === foundTrain);

      const lostCoach = normalizeString(lost.coachnum);
      const foundCoach = normalizeString(found.coachnum);
      const coachMatch = !!(lostCoach && foundCoach && lostCoach === foundCoach);

      const dateDiff = getDateDiffInDays(lost.dateoflost, found.dateoffound);
      const dateMatch = typeof dateDiff === 'number' && dateDiff <= 5;

      const keywordMatch = lostName.includes(foundName) || foundName.includes(lostName);
      const isEligible = trainMatch && dateMatch && (similarity >= 0.5 || keywordMatch);

      console.log('-------------------------------------------------------------');
      console.log('🔍 Comparing Items:');
      console.log(`📦 Lost Item: "${lostName}" | Found Item: "${foundName}"`);
      console.log(`🚆 Train Match: ${trainMatch}`);
      console.log(`📈 Similarity Score: ${similarity}`);
      console.log(`🪑 Coach Match: ${coachMatch ? 'Yes' : 'No'}`);
      console.log(`📅 Date Difference: ${dateDiff !== null ? dateDiff + ' days' : 'N/A'}`);
      console.log(`🔑 Keyword Match: ${keywordMatch ? 'Yes' : 'No'}`);
      console.log(`✅ Eligible Match: ${isEligible}`);

      if (isEligible) {
        let confidence = 'Medium';
        if (similarity >= 0.8) {
          confidence = 'High';
        } else if (coachMatch || keywordMatch) {
          confidence = 'Medium+';
        }

        suggestions.push({
          lostId: lost._id,
          foundId: found._id,
          confidence,
          status: 'Pending'
        });
      }
    });
  });

  console.log(`📌 Total suggestions generated: ${suggestions.length}`);
  return suggestions;
};

// Controller to generate and return match results
exports.generateMatches = async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    console.log(`🔎 Fetched ${lostItems.length} lost items and ${foundItems.length} found items.`);

    if (!lostItems.length || !foundItems.length) {
      console.log('⚠️ No lost or found items to compare.');
      return res.status(200).json({
        status: 'success',
        message: 'No matches to generate.',
        matches: []
      });
    }

    const suggestions = matchLostAndFound(lostItems, foundItems);
    const allMatches = [];

    for (const suggestion of suggestions) {
      let match = await Match.findOne({
        lostId: suggestion.lostId,
        foundId: suggestion.foundId
      });

      if (!match) {
        match = await Match.create(suggestion);
        console.log('✅ New match created:', match._id);
      } else {
        console.log('⚠️ Match already exists:', match._id);
      }

      const populatedMatch = await Match.findById(match._id)
        .populate('lostId')
        .populate('foundId');

      allMatches.push(populatedMatch);
    }

    console.log(`✅ Returning ${allMatches.length} total matched entries.`);
    return res.status(200).json({
      status: 'success',
      message: `${allMatches.length} matches returned.`,
      matches: allMatches
    });

  } catch (err) {
    console.error("❌ Match Generation Error:", err);
    return res.status(500).json({
      status: 'fail',
      message: 'Error generating matches',
      error: err.message
    });
  }
};
