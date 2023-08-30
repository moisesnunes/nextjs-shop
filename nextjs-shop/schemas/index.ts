import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import product from './product'
import { user, account, verificationToken } from 'next-auth-sanity/schemas';

export const schemaTypes = [post, author, category, blockContent, product, user, account]
