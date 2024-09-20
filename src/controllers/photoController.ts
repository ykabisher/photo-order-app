import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface CacheEntry {
  timestamp: number;
  data: string[];
}

const cache: { [key: string]: CacheEntry } = {};

export const getPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countParam = req.query.count;

    const count = parseInt(countParam as string, 10);
    if (isNaN(count) || count <= 2) {
      return res.status(400).json({ message: 'Invalid count parameter' });
    }

    const MAX_PER_PAGE = 10;
    const perPage = Math.min(count, MAX_PER_PAGE);

    // Check cache
    const cacheKey = `photos_${perPage}`;
    const cacheEntry = cache[cacheKey];
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

    if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
      console.log('Serving photos from cache');
      return res.json(cacheEntry.data);
    }

    const API_KEY = process.env.PIXABAY_API_KEY;
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        per_page: perPage,
      },
    });

    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Error from Pixabay API' });
    }

    const data = response.data;

    if (data.totalHits === 0) {
      return res.status(404).json({ message: 'No photos found' });
    }

    const hits = data.hits;
    const photoUrls = hits.map((hit: any) => hit.webformatURL);

    // Store in cache
    cache[cacheKey] = {
      timestamp: Date.now(),
      data: photoUrls,
    };

    res.json({photos:photoUrls});
  } catch (error) {
    console.log('Error fetching photos', error);
    next(error);
  }
};
