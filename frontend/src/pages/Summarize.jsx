
import React,{useState} from 'react'
import { summarizeAPI } from '../services/api'

export default function Summarize(){
 const[text,setText]=useState('Artificial intelligence is transforming industries worldwide. Machine learning algorithms enable computers to learn from data and improve their performance without explicit programming. Natural language processing helps machines understand and generate human language. Deep learning, inspired by the human brain, uses neural networks with multiple layers to solve complex problems. AI applications range from healthcare diagnostics to autonomous vehicles, revolutionizing how we work and live.')
 const[length,setLength]=useState('medium')
 const[summary,setSummary]=useState('')
 const[vocabulary,setVocabulary]=useState([])
 const[loading,setLoading]=useState(false)
 const[error,setError]=useState('')
 const[savedVocab,setSavedVocab]=useState(JSON.parse(localStorage.getItem('savedVocab') || '[]'))

 // Extract vocabulary from text (simple word frequency + length filter)
 const extractVocabulary = (text) => {
   const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
   const wordFreq = {}
   words.forEach(word => {
     if(word.length > 6) {
       wordFreq[word] = (wordFreq[word] || 0) + 1
     }
   })
   return Object.entries(wordFreq)
     .sort((a,b) => b[1] - a[1])
     .slice(0, 8)
     .map(([word]) => ({
       word,
       definition: getDefinition(word),
       addedAt: new Date().toLocaleDateString()
     }))
 }

 // Simple word definitions (hardcoded for demo)
 const getDefinition = (word) => {
   const defs = {
     artificial: 'Made or produced by human beings rather than occurring naturally',
     intelligence: 'The ability to learn, understand, and make decisions',
     transforming: 'Undergoing a complete change in form, appearance, or character',
     algorithms: 'Step-by-step procedures for solving a problem or accomplishing a task',
     performance: 'The action or process of performing a task or function',
     processing: 'Performing a series of operations on information',
     inspired: 'Stimulated or impelled to create or do something',
     neural: 'Relating to a nerve or the nervous system',
     networks: 'A group of interconnected things or people',
     applications: 'The action of putting something into operation',
     diagnostics: 'The identification of the nature of an illness or problem',
     autonomous: 'Independent; self-governing; not controlled by others',
     revolutionizing: 'Completely changing something in a sudden and dramatic way',
   }
   return defs[word] || 'Definition not available'
 }

 const go = async() => {
   setLoading(true)
   setError('')
   try{
     const res = await summarizeAPI(text, length)
     setSummary(res.summary)
     const vocab = extractVocabulary(res.summary)
     setVocabulary(vocab)
   }catch(e){
     setError(e.response?.data?.detail || e.message || 'Error summarizing text')
     setSummary('')
     setVocabulary([])
   }finally{
     setLoading(false)
   }
 }

 const saveWord = (word) => {
   const exists = savedVocab.find(v => v.word === word.word)
   if(!exists) {
     const updated = [...savedVocab, word]
     setSavedVocab(updated)
     localStorage.setItem('savedVocab', JSON.stringify(updated))
   }
 }

 const removeWord = (word) => {
   const updated = savedVocab.filter(v => v.word !== word)
   setSavedVocab(updated)
   localStorage.setItem('savedVocab', JSON.stringify(updated))
 }

 const isSaved = (word) => savedVocab.some(v => v.word === word)

 return(
   <div className="container">
     <h1>📚 LexiSummarize</h1>
     <p style={{color:'#7f8c8d', marginBottom:'20px'}}>Summarize text and learn new vocabulary words</p>
     
     {/* Input Section */}
     <div style={{marginBottom:'30px'}}>
       <label style={{display:'block', marginBottom:'8px', fontWeight:'600'}}>Enter or paste your text:</label>
       <textarea 
         placeholder="Paste your text here..."
         value={text} 
         onChange={e=>setText(e.target.value)}
       />
     </div>

     {/* Controls */}
     <div className="controls">
       <label>Summary Length: </label>
       <select value={length} onChange={e=>setLength(e.target.value)}>
         <option value='short'>Short (50 words)</option>
         <option value='medium'>Medium (100 words)</option>
         <option value='long'>Long (150+ words)</option>
       </select>
       <button onClick={go} disabled={loading || !text.trim()}>
         {loading ? '⏳ Summarizing...' : '✨ Summarize'}
       </button>
     </div>

     {/* Error Message */}
     {error && <div className="message error">❌ {error}</div>}

     {/* Summary Result */}
     {summary && (
       <div style={{marginTop:'30px'}}>
         <h2>📝 Summary</h2>
         <div className="result">
           <p>{summary}</p>
         </div>
       </div>
     )}

     {/* Vocabulary Section */}
     {vocabulary.length > 0 && (
       <div style={{marginTop:'30px'}}>
         <h2>📖 New Vocabulary from Summary</h2>
         <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'15px'}}>
           {vocabulary.map((word, idx) => (
             <div key={idx} style={{
               border:'1px solid #e0e0e0',
               borderRadius:'8px',
               padding:'15px',
               backgroundColor:'#fafafa',
               boxShadow:'0 1px 3px rgba(0,0,0,0.05)'
             }}>
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                 <div style={{flex:1}}>
                   <h4 style={{margin:'0 0 8px 0', color:'#2c3e50'}}>{word.word}</h4>
                   <p style={{margin:'0 0 12px 0', fontSize:'13px', color:'#555', lineHeight:'1.5'}}>{word.definition}</p>
                 </div>
               </div>
               <button 
                 onClick={() => isSaved(word.word) ? removeWord(word.word) : saveWord(word)}
                 style={{
                   width:'100%',
                   padding:'8px',
                   backgroundColor: isSaved(word.word) ? '#e74c3c' : '#27ae60',
                   color:'white',
                   border:'none',
                   borderRadius:'4px',
                   cursor:'pointer',
                   fontSize:'12px',
                   fontWeight:'600'
                 }}
               >
                 {isSaved(word.word) ? '❌ Remove from List' : '❤️ Save Word'}
               </button>
             </div>
           ))}
         </div>
       </div>
     )}

     {/* Saved Vocabulary */}
     {savedVocab.length > 0 && (
       <div style={{marginTop:'30px'}}>
         <h2>💾 My Saved Vocabulary ({savedVocab.length})</h2>
         <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'15px'}}>
           {savedVocab.map((word, idx) => (
             <div key={idx} style={{
               border:'2px solid #3498db',
               borderRadius:'8px',
               padding:'15px',
               backgroundColor:'#ecf0f1'
             }}>
               <h4 style={{margin:'0 0 8px 0', color:'#2c3e50'}}>{word.word}</h4>
               <p style={{margin:'0 0 8px 0', fontSize:'13px', color:'#555'}}>{word.definition}</p>
               <p style={{margin:'0', fontSize:'11px', color:'#95a5a6'}}>Saved: {word.addedAt}</p>
               <button 
                 onClick={() => removeWord(word.word)}
                 style={{
                   marginTop:'10px',
                   width:'100%',
                   padding:'6px',
                   backgroundColor:'#e74c3c',
                   color:'white',
                   border:'none',
                   borderRadius:'4px',
                   cursor:'pointer',
                   fontSize:'12px'
                 }}
               >
                 Remove
               </button>
             </div>
           ))}
         </div>
       </div>
     )}
   </div>
 )
}
