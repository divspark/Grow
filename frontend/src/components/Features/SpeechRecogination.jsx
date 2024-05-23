import "./Speech.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import ProductCard from '../main/ProductCard';

const SpeechRecogination = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000
  });
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false); // New state for tracking if listening is active

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    setIsListening(true); // Update state to indicate that listening is active
    setTimeout(() => {
      stopListening(); // Stop listening after 10 seconds
    }, 10000);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false); // Update state to indicate that listening is not active
    // Reset transcript, productData, and error states to null
    setTextToCopy(null);
    setProductData(null);
    setError(null);
  };

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      fetch(`http://localhost:3002/product?input=${encodeURIComponent(transcript)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Product not found');
          }
          return response.json();
        })
        .then(data => {
          setProductData(data);
          console.log(data);
          setError(null); // Clear any previous errors
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
          setError(error.message);
          setProductData(null); // Clear product data if there's an error
        });
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <>
      <div className="speech-container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </button>
          {isListening ? ( // Conditional rendering based on listening state
            <button onClick={stopListening}>Stop Listening</button>
          ) : (
            <button onClick={startListening}>Start Listening</button>
          )}
        </div>

        {error ? (
          <p>{error}</p>
        ) : productData ? (
          <ProductCard
            name={productData.name}
            stock={productData.stock}
            photo={productData.photo}
            price={productData.price}
          />
        ) : (
          <p>Loading product...</p>
        )}
      </div>
    </>
  );
};

export default SpeechRecogination;


// import "./Speech.css"
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import useClipboard from "react-use-clipboard";
// import { useState, useEffect } from "react";
// import ProductCard from '../main/ProductCard';

// const SpeechRecogination = () => {
//   const [textToCopy, setTextToCopy] = useState();
//   const [isCopied, setCopied] = useClipboard(textToCopy, {
//     successDuration: 1000
//   });
//   const [productData, setProductData] = useState(null);
//   const [error, setError] = useState(null);

//   const startListening = () => {
//     SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
//     setTimeout(() => {
//       SpeechRecognition.stopListening();
//     }, 10000); // Stop listening after 10 seconds
//   };

//   const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript) {
//       fetch(`http://localhost:3002/product?input=${encodeURIComponent(transcript)}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Product not found');
//           }
//           return response.json();
//         })
//         .then(data => {
//           setProductData(data);
//           console.log(data);
//           setError(null); // Clear any previous errors
//         })
//         .catch(error => {
//           console.error('Error fetching product data:', error);
//           setError(error.message);
//           setProductData(null); // Clear product data if there's an error
//         });
//     }
//   }, [transcript]);



//   if (!browserSupportsSpeechRecognition) {
//     return <p>Your browser does not support speech recognition.</p>;
//   }

//   return (
//     <>
//       <div className="speech-container">
//         <h2>Speech to Text Converter</h2>
//         <br />
//         <p>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

//         <div className="main-content" onClick={() => setTextToCopy(transcript)}>
//           {transcript}
//         </div>

//         <div className="btn-style">
//           <button onClick={setCopied}>
//             {isCopied ? 'Copied!' : 'Copy to clipboard'}
//           </button>
//           <button onClick={startListening}>Start Listening</button>
//           <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
//         </div>

//         {error ? (
//           <p>{error}</p>
//         ) : productData ? (
//           <ProductCard
//             name={productData.name}
//             stock={productData.stock}
//             photo={productData.photo}
//             price={productData.price}
//           />
//         ) : (
//           <p>Loading product...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default SpeechRecogination;
