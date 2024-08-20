# GENERATEUR DE TEMPLATES BLADE - SYNTAXE

## Boucles et conditions
| Action | Syntaxe |
|--|--|
|Inclure du php | @php ...............@endphp|
|Afficher la valeur d'une variable|{!!$maVariable!!}|
|Exp pour une img |src="/img/{!!$trainingCourse->image_name!!}"|
|Afficher la valeur d'une variable|{{ $formattedDate }}|
|if|@if(condition) @else .... @endif|
|foreach|@foreach(trucs as truc).... @endforeach|
|Etendre un template|@extends('layouts/frame')|
|Remplir une section|@section('contenu').......@endsection|

## Affichage messages d'erreur /success 
```
@if ($message = Session::get('success'))
<div class="alert alert-success" role="alert">
    <strong>{{ $message }}</strong>
</div>
@endif

@if ( $errors->any() )
<div class="container mt-5">
    <div class="alert alert-danger" role="alert">
        @foreach($errors->all() as $error)
        <li class="text-red-500 list-none">
            {{$error}}
        </li>
        @endforeach
    </div>
</div>
@endif
```