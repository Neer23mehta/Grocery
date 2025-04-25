// 'use client';

// import { useEffect } from 'react';
// import $ from 'jquery';

// export default function IndiaMap() {
//   useEffect(() => {
//     // Expose jQuery globally for jVectorMap to work
//     if (typeof window !== 'undefined') {
//       window.$ = $;
//       window.jQuery = $;
//     }

//     const loadScripts = async () => {
//       const loadScript = (src) =>
//         new Promise((resolve, reject) => {
//           const script = document.createElement('script');
//           script.src = src;
//           script.onload = resolve;
//           script.onerror = reject;
//           document.body.appendChild(script);
//         });

//       await loadScript('/jvectormap/jquery-jvectormap-2.0.5.min.js');
//       await loadScript('/jvectormap/jquery-jvectormap-in-mill.js');

//       $('#india-map').vectorMap({
//         map: 'in_mill',
//         backgroundColor: '#1a1a1a',
//         regionStyle: {
//           initial: {
//             fill: '#4a89dc',
//           },
//         },
//         onRegionClick: function (event, code) {
//           alert(`You clicked: ${code}`);
//         },
//       });
//     };

//     loadScripts();
//   }, []);

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="/jvectormap/jquery-jvectormap-2.0.5.css"
//       />
//       <div
//         id="india-map"
//         style={{
//           width: '100%',
//           maxWidth: '700px',
//           height: '500px',
//           margin: '2rem auto',
//           backgroundColor: '#111',
//           borderRadius: '10px',
//           padding: '10px',
//         }}
//       />
//     </>
//   );
// }
