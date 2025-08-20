import { Request, Response } from "express";
import Song from "../models/Song";

// Create a song
export const createSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get all songs
export const getSongs = async (_req: Request, res: Response) => {
  const songs = await Song.find();
  res.json(songs);
};

// Update song
export const updateSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete song
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Stats endpoint
export const getStats = async (_req: Request, res: Response) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct("artist").then(
      (arr) => arr.length
    );
    const totalAlbums = await Song.distinct("album").then((arr) => arr.length);
    const totalGenres = await Song.distinct("genre").then((arr) => arr.length);

    const songsByGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const songsByArtist = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          count: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const songsByAlbum = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Derived values
    const topGenre = songsByGenre[0]?._id || null;
    const topArtist = songsByArtist[0]?._id || null;
    const avgSongsPerArtist =
      totalArtists > 0 ? (totalSongs / totalArtists).toFixed(2) : 0;

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum,
      topGenre,
      topArtist,
      avgSongsPerArtist,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
