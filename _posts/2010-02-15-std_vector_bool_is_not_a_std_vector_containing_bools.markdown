---
layout: post
title: "std::vector&lt;bool&gt; is NOT a std::vector containing bools"
permalink: /wordpress-10
tags:
 - development
---

Everything in the title, but let me explain... Lately I've spent a lot of time trying to make a serialization/deserialization work with the huge piece of software I'm working on at Golaem. Anyway I came across a strange compiler error when trying to deserialize a 'std::vector&lt;bool&gt;'. Here's what our serialization engine is like:

{% highlight cpp linenos %}
template<T>
void read(std::vector<T>& myVector, Bitstream myStream)
{
  unsigned int size;
  read(size,myStream);
  vector.resize(size);
  for (unsigned int i = 0 ; i < size ; i++)
  {
    read(vector[i],stream);
  }
}
void read(bool& myBool, Bitstream stream)
{
  ...
}
template<T>
void write(const std::vector<T>& myVector, Bitstream myStream)
{
  unsigned int size;
  write((unsigned int)myVector.size(),myStream);
  for (unsigned int i = 0 ; i < myVector.size() ; i++)
  {
    write(vector[i],stream);
  }
}
void write(const bool& myBool, Bitstream stream)
{
  ...
}
{% endhighlight cpp %}

The serialization worked ok, but when trying the deserialization I got a cryptic compiler error:

> impossible to convert from 'std::_Vb_reference&lt;_Sizet,_Difft,_MycontTy&gt;' to 'bool &'

WTF ? This code worked perfectly for doubles, ints and other basic types bools should be fine no ? After a quick google and follow links session I stopped on the [cplusplus.com reference page of the std::vector](http://www.cplusplus.com/reference/stl/vector/). You should go and read this page completly, yep now ! I give you a few seconds... OK you should've finished now, and yeah, you read well, 'std::vector&lt;bool&gt;' is a template specialization of 'std::vector&lt;T&gt;' and it does not have the the same properties: 'std::vector&lt;bool&gt;::operator[]' doesn't returns a reference to a bool but a specially defined type. I love C++ and especially the STL... Yes, in most cases it's transparent because this type defines a transtyping operator to bool. Yes, it is designed to save space as each element of a std::vector&lt;bool&gt; takes only 1 bit. But, it is inconsistent (std::deque&lt;bool&gt; is a std::deque of bools), opposed to the basic principles of c++ templates, and, apparently not normalized (see [this open letter wrote by Herb Sutter](http://www.gotw.ca/publications/N1211.pdf) the day i turned 15). Another good joke from our pals at C++ ISO committee...