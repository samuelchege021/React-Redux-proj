import Product from './models/productModel.js'

const restoreOriginalImagePaths = async () => {
  const products = await Product.findAll();

  for (let product of products) {
    if (product.image.includes('/images//')) {
      // Remove the extra "/images//" and keep only the correct path
      const fixedPath = product.image.replace('/images//', '/Images/');
      product.image = fixedPath;
      await product.save();
      console.log(`✅ Restored image path for: ${product.name}`);
    }
  }

  console.log('🎉 All image paths have been restored to original.');
};

restoreOriginalImagePaths();
