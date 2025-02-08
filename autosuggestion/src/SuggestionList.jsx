import React from "react";

const SuggestionList = ({
  dataKey,
  suggestions,
  highlight,
  onSuggestionClick,
}) => {
  const getHighligtedText = (text) => text;
  return (
    <>
      {suggestions?.map((suggestions, index) => {
        const currSuggestion = dataKey ? suggestions[dataKey] : suggestions;
        return (
          <div onClick={onSuggestionClick}>
            {getHighligtedText(currSuggestion, highlight)}
          </div>
        );
      })}
    </>
  );
};

export default SuggestionList;
