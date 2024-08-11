// https://github.com/huggingface/huggingface.js/blob/main/packages/inference/README.md

import { HfInference } from '@huggingface/inference'
import { textGeneration } from '@huggingface/inference';


export let hfInf = async (tex) =>{
    const token_hf = process.env.HF_KEY;
    const hf = new HfInference(token_hf);
    console.log (tex.length);
  /* const out = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs:
        'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930.',
      parameters: {
        max_length: 100
      }
    })
    console.log (out.summary_text) */

    const ret = await hf.translation({
      model: 'facebook/mbart-large-50-many-to-many-mmt',
      inputs: tex,
      parameters: {
      "src_lang": "en_XX",
      "tgt_lang": "ru_RU"
    }
    });
    
    const fret = ret.translation_text;
    console.log (fret.length);
    //console.log (fret);

return fret
}
