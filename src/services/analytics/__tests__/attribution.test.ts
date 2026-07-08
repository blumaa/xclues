import { describe, it, expect, beforeEach } from 'vitest';
import { captureAttribution, getAttributionSource } from '../attribution';

beforeEach(() => {
  sessionStorage.clear();
});

describe('captureAttribution', () => {
  it('stores the ?ref value as the source', () => {
    captureAttribution('?ref=reddit');
    expect(getAttributionSource()).toBe('reddit');
  });

  it('falls back to utm_source when ref is absent', () => {
    captureAttribution('?utm_source=bluesky&utm_medium=social');
    expect(getAttributionSource()).toBe('bluesky');
  });

  it('prefers ref over utm_source', () => {
    captureAttribution('?ref=mastodon&utm_source=reddit');
    expect(getAttributionSource()).toBe('mastodon');
  });

  it('sanitizes to lowercase alphanumerics, dash and underscore', () => {
    captureAttribution('?ref=Reddit%20AMA!');
    expect(getAttributionSource()).toBe('redditama');
  });

  it('is first-touch: does not overwrite an existing source in the session', () => {
    captureAttribution('?ref=reddit');
    captureAttribution('?ref=bluesky');
    expect(getAttributionSource()).toBe('reddit');
  });

  it('stores nothing when neither ref nor utm_source is present', () => {
    captureAttribution('?foo=bar');
    expect(getAttributionSource()).toBeNull();
  });

  it('stores nothing when the value sanitizes to empty', () => {
    captureAttribution('?ref=%21%21%21');
    expect(getAttributionSource()).toBeNull();
  });
});

describe('captureAttribution from referrer (bare URLs)', () => {
  it('infers the source from a known referrer host', () => {
    captureAttribution('', 'https://www.reddit.com/r/movies/comments/abc');
    expect(getAttributionSource()).toBe('reddit');
  });

  it('maps t.co and x.com to x', () => {
    captureAttribution('', 'https://t.co/abc');
    expect(getAttributionSource()).toBe('x');
  });

  it('maps a federated mastodon instance', () => {
    captureAttribution('', 'https://mastodon.social/@someone');
    expect(getAttributionSource()).toBe('mastodon');
  });

  it('lets an explicit ref param win over the referrer', () => {
    captureAttribution('?ref=bluesky', 'https://www.reddit.com/r/x');
    expect(getAttributionSource()).toBe('bluesky');
  });

  it('ignores an unknown referrer host', () => {
    captureAttribution('', 'https://www.google.com/search?q=x');
    expect(getAttributionSource()).toBeNull();
  });

  it('ignores an internal referrer (our own domain)', () => {
    captureAttribution('', 'https://filmclues.space/films');
    expect(getAttributionSource()).toBeNull();
  });

  it('ignores a malformed referrer', () => {
    captureAttribution('', 'not a url');
    expect(getAttributionSource()).toBeNull();
  });
});

describe('getAttributionSource', () => {
  it('returns null when nothing has been captured', () => {
    expect(getAttributionSource()).toBeNull();
  });
});
