import React, { useState } from 'react';
import SpeechRecogination from '../../components/Features/SpeechRecogination';
import CameraRecogination from '../../components/Features/CameraRecogination';
//import Basic from '../../components/Features/Basic';
import BasicInput from '../../components/Features/BasicInput';
import Prod_navbar from '../../components/main/Prod_navbar';

const AddItem = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const renderOption = () => {
    switch (selectedOption) {
      case 'SpeechRecogination':
        return <SpeechRecogination />;
      case 'CameraRecogination':
        return <CameraRecogination />;
      case 'Basic':
        return <BasicInput />;
      default:
        return <BasicInput />;
    }
  };

  return (
    <>
    <Prod_navbar />
    <div>
      <div className="options">
      <button onClick={() => setSelectedOption('Basic')}>Basic</button>
        <button onClick={() => setSelectedOption('SpeechRecogination')}>SpeechRecogination</button>
        <button onClick={() => setSelectedOption('CameraRecogination')}>CameraRecogination</button>
      </div>
      <div className="selected-option">
        {renderOption()}
      </div>
    </div>
    </>
  );
};

export default AddItem;
