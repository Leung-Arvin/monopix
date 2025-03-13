use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn apply_grayscale(image_data: &mut [u8]) {
    for pixel in image_data.chunks_mut(4) {
        let r = pixel[0] as u32;
        let g = pixel[1] as u32;
        let b = pixel[2] as u32;
        let avg = ((r + g + b) / 3) as u8;
        pixel[0] = avg;
        pixel[1] = avg;
        pixel[2] = avg;
    }
}